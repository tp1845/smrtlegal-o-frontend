'use client'
import Card from "@/components/card";
import Input from "@/components/input";
import Tabs from "@/components/tabs";
import React, { useEffect, useState } from 'react';
import pencilsvg from '@/assets/pencil.svg'
import Image from 'next/image';
import Button from "@/components/button";

import * as api from '@/api'
import { validation } from '@/utils/validation'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';

import { useUser } from '@/context/user';

import { useRouter } from 'next/navigation'
import Prompt from "@/popups/prompt";
export default function MyAccount() {
    const { user, setUser } = useUser();
    const { push } = useRouter();

    useEffect(() => {
        setFormProfile({
            avatar: user.avatar,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            email: user.email,
        })

        const url = new URLSearchParams(location.search);
        const action = url.get('action');
        
        if (['email-changed'].includes(action)) {
            api.me()
                .then(data => data.json())
                .then(data => {
                    setUser({...data.user})
                    localStorage.setItem('user', JSON.stringify(data.user))
                })

            setPopup({
                ...popup,
                server_success: {
                    visible: true,
                    message: 'Email has been successfully changed!'
                }
            })
            window.history.pushState({}, document.title, location.pathname);
        }
    }, [user])
    
    const tabs = [
        {
            label: "Profile",
            slug: "",
        },
        {
            label: "Notification",
            slug: "notification",
        },
        {
            label: "Teams",
            slug: "teams",
        }
    ];

    const [active, setActive] = useState(tabs[0])

    const [state, setState] = useState({
        edit: {
            password: false,
            profile: false,
        },
        confirm: false
    })

    const [previewAvatar, setPreviewAvatar] = useState("")

    const [errorsPassword, setPasswordErrors] = useState({
        'oldpassword': [],
        'password': [],
        'confirm_password': [],
    });

    const [errorsProfile, setProfileErrors] = useState({
        'fname': [],
        'lname': [],
        'phone': [],
        'email': [],
    });
    
    const [formPassword, setFormPassword] = useState({
        oldpassword: '',
        password: '',
        confirm_password: '',
    })

    const [readonly, setReadOnly] = useState({
        profile: true,
        password: true,
    })

    const [formProfile, setFormProfile] = useState({
        avatar: '',
        fname: '',
        lname: '',
        phone: '',
        email: '',
    })

    const [popup, setPopup] = useState({
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            visible: false,
            message: '',
        },
        prompt: {
            visible: false,
            message: '',
        },
    })

    const rulesPassword = {
        oldpassword: ['required'],
        password: ['password','required'],
        confirm_password: ['password','required'],
    }

    const rulesProfile = {
        fname: [],
        lname: [],
        phone: ['phone'],
        email: ['email', 'required'],
    }

    const onChangePassword = (field, value, rules) => {
        setFormPassword({
            ...formPassword,
            [field]: value
        })

        setPasswordErrors({
            ...errorsPassword,
            [field]: []
        })

        const messages = validation(value, rules);
        
        if (messages.length) {
            setPasswordErrors({
                ...errorsPassword,
                [field]: [...messages]
            })
        }
    }

    const onChangeProfile = (field, value, rules) => {
        setFormProfile({
            ...formProfile,
            [field]: value
        })

        setProfileErrors({
            ...errorsProfile,
            [field]: []
        })

        const messages = validation(value, rules);
        
        if (messages.length) {
            setProfileErrors({
                ...errorsProfile,
                [field]: [...messages]
            })
        }
    }

    const changeTab = (tab) => {
        // setActive(tab)
        push("/my-account/" + tab.slug)
    }

    const handleEditPassword = () => {
        setState({
            ...state,
            edit: {
                ...state.edit,
                password: ! state.edit.password
            }
        })

        setReadOnly({
            ...readonly,
            password: state.edit.password
        })
    }

    const handleEditProfile = () => {
        setState({
            ...state,
            edit: {
                ...state.edit,
                profile: ! state.edit.profile
            }
        })

        setReadOnly({
            ...readonly,
            profile: state.edit.profile
        })
    }

    const updatePasswords = () => {
        let messages = {}
        for(let field in rulesPassword) {
            let message = validation(formPassword[field], rulesPassword[field]);
            messages[field] = message
        }

        setPasswordErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            api.reset_password({
                ...formPassword,
                email: user.email
            })
                .then(data => data.json())
                .then(data => {
                    const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length || data.exception || data.status == 'error') {
                        const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                        setPopup({
                            ...popup,
                            server_error: {
                                visible: true,
                                message
                            }
                        })
                        return ;
                    }

                    setPopup({
                        ...popup,
                        server_success: {
                            visible: true,
                            message: data.message
                        }
                    })

                    setFormPassword({
                        oldpassword: '',
                        password: '',
                        confirm_password: '',
                    })

                    setReadOnly({
                        ...readonly,
                        password: true
                    })

                    setState({
                        ...state,
                        edit: {
                            ...state.edit,
                            password: false
                        }
                    })
                })
            }
    }

    const updateProfile = (confirm = false) => {
        let messages = {}
        for(let field in rulesProfile) {
            let message = validation(formProfile[field], rulesProfile[field]);
            messages[field] = message
        }

        setProfileErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            if ((user.email != formProfile.email) && ! confirm) {
                setPopup({
                    ...popup,
                    prompt: {
                        ...popup.prompt,
                        visible: true,
                        message: 'Are you sure you want to change email?'
                    }
                })
                return;
            }

            const fd = new FormData();
            for(let field in formProfile) {
                fd.append(field, formProfile[field])
            }
            fd.append('redirect', location.protocol + '//' + location.host + '/my-account?action=email-changed')
            api.update_profile(fd)
                .then(data => data.json())
                .then(data => {
                    const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length || data.exception) {
                        const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                        setPopup({
                            ...popup,
                            prompt: {
                                visible: false,
                                message: '',
                            },
                            server_error: {
                                visible: true,
                                message
                            }
                        })
                        return ;
                    }

                    //if (user.email == formProfile.email) {
                        setPopup({
                            ...popup,
                            prompt: {
                                visible: false,
                                message: '',
                            },
                            server_success: {
                                visible: true,
                                message: data.message
                            }
                        })

                        setUser(data.data)
                        localStorage.setItem('user', JSON.stringify(data.data))

                        setReadOnly({
                            ...readonly,
                            profile: true,
                        })

                        setState({
                            ...state,
                            edit: {
                                ...state.edit,
                                profile: false
                            }
                        })
                    //}
                    
                    
                })
        }
    }

    const handleEditImage = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = ({ target: { files : [file]}}) => {
            const fr = new FileReader
            fr.onloadend = () => {
                setPreviewAvatar(fr.result)
            }
            setFormProfile({
                ...formProfile,
                avatar: file
            })
            fr.readAsDataURL(file)
        }
        input.click();
    }

    const handleConfirmChangeEmail = () => {
        setPopup({
            ...popup,
            prompt: {
                ...popup.prompt,
                visible: false
            }
        })

        updateProfile(true);
    }

    return (<div className="p-4 lg:pl-[270px] pl-0 pt-[90px]">
        <Tabs tabs={tabs} active={active} change={changeTab} />
        <div className="pt-[30px] grid grid-cols-[1fr_1fr_20%] gap-[20px]">
            <Card>
                <div className="mb-[40px] grid grid-cols-[100px_1fr] gap-[20px] items-center content-center">
                    <div>
                        <div className="w-[86px] h-[86px] rounded-full bg-[#222]">
                            {
                                previewAvatar ? 
                                    <img className="w-full h-full object-contain rounded-full" src={previewAvatar} alt="preview" />
                                : <></>
                            }
                            {
                                user.avatar && ! previewAvatar ? 
                                    <img className="w-full h-full object-contain rounded-full" src={user.avatar} alt="avatar" />
                                : <></>
                            }
                        </div>
                    </div>
                    <div className="relative flex flex-col text-[#222]">
                        <h3 className="font-bold text-[28px] whitespace-nowrap text-ellipsis overflow-hidden max-w-[240px]">{user.fname && user.lname ? user.fname + ' ' + user.lname : user.email}</h3>
                        <span className="text-[12px] underline cursor-pointer" onClick={handleEditImage}>Edit display images</span>
                        <a href="#" onClick={(e) => {e.preventDefault();handleEditProfile()}} className="absolute top-0 right-0">
                            <Image src={pencilsvg} width={22} height={22} alt="pencil" />
                        </a>
                    </div>
                </div>
                <div className="mb-[20px]">
                    <Input 
                        label="First name"  
                        type="text" 
                        placeholder="First name"
                        value={formProfile.fname || ''}
                        errors={errorsProfile.fname}
                        readOnly={readonly.profile}
                        disabled={readonly.profile}
                        onInput={(e) => onChangeProfile('fname', e.target.value, rulesProfile.fname)}
                    />
                </div>
                <div className="mb-[20px]">
                    <Input 
                        label="Last name"
                        type="text" 
                        placeholder="Last name"
                        value={formProfile.lname || ''}
                        errors={errorsProfile.lname}
                        readOnly={readonly.profile}
                        disabled={readonly.profile}
                        onInput={(e) => onChangeProfile('lname', e.target.value, rulesProfile.lname)}
                    />
                </div>
                <div className="mb-[20px]">
                    <Input 
                        label="Phone Number"  
                        type="phone" 
                        placeholder="Phone Number"
                        value={formProfile.phone || ''}
                        errors={errorsProfile.phone}
                        readOnly={readonly.profile}
                        disabled={readonly.profile}
                        onInput={(e) => onChangeProfile('phone', e.target.value, rulesProfile.phone)}
                    />
                </div>
                <Input 
                    label="Email Address"  
                    type="email" 
                    placeholder="Email Address" 
                    value={formProfile.email || ''}
                    errors={errorsProfile.email}
                    readOnly={readonly.profile}
                    disabled={readonly.profile}
                    onInput={(e) => onChangeProfile('email', e.target.value, rulesProfile.email)}
                />
                {
                    state.edit.profile ? (
                        <div className="flex justify-end mt-[32px]">
                            <Button
                                label="Cencel"
                                onClick={handleEditProfile}
                                className="bg-white !text-[#222] !py-2 px-4 border border-[#222] font-Eina03">
                                Cencel
                            </Button>
                            <Button  
                                label="Update"
                                className="bg-[#1860CC] !py-2 px-4 ml-[12px] font-Eina03 font-bold"
                                onClick={() => {updateProfile(false)}}
                            ></Button>
                        </div>
                    ) : <></>
                }
            </Card>
            <Card className="relative">
                <h4 className="font-Eina03 font-bold mb-[20px]">Change password</h4>
                <a href="#" onClick={(e) => {e.preventDefault(); handleEditPassword();}} className="absolute top-[24px] right-[24px]">
                    <Image src={pencilsvg} width={22} height={22} alt="pencil" />
                </a>
                <div className="mb-[20px]">
                    <Input 
                        label="Old Password"  
                        type="password" 
                        placeholder="******" 
                        readOnly={readonly.password}
                        disabled={readonly.password}
                        value={formPassword.oldpassword}
                        errors={errorsPassword.oldpassword}
                        onInput={(e) => onChangePassword('oldpassword', e.target.value, rulesPassword.oldpassword)}
                        />
                </div>
                <div className="mb-[20px]">
                    <Input 
                        label="Password"  
                        type="password" 
                        placeholder="******" 
                        readOnly={readonly.password}
                        disabled={readonly.password}
                        value={formPassword.password}
                        errors={errorsPassword.password}
                        onInput={(e) => onChangePassword('password', e.target.value, rulesPassword.password)}
                        />
                </div>
                <Input 
                    label="Confirm password"  
                    type="password" 
                    placeholder="******" 
                    readOnly={readonly.password}
                        disabled={readonly.password}
                    value={formPassword.confirm_password}
                    errors={errorsPassword.confirm_password}
                    onInput={(e) => onChangePassword('confirm_password', e.target.value, [...rulesPassword.confirm_password, `confirm:${formPassword.password}`])}
                    />
                    {
                        state.edit.password ? (
                            <div className="flex justify-end mt-[32px]">
                                <Button
                                    label="Cencel"
                                    onClick={handleEditPassword}
                                    className="bg-white !text-[#222] !py-2 px-4 border border-[#222] font-Eina03">
                                    Cencel
                                </Button>
                                <Button 
                                    label="Update"
                                    onClick={updatePasswords}
                                    className="bg-[#1860CC] !py-2 px-4 ml-[12px] font-Eina03 font-bold"
                                ></Button>
                            </div>
                        ) : <></>
                    }
            </Card>
        </div>

        <ServerError 
            open={popup.server_error.visible} 
            title="Error"
            message={popup.server_error.message}
            onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
        />

        <ServerSuccess
            open={popup.server_success.visible} 
            title="Success"
            message={popup.server_success.message}
            onClose={() => {setPopup({...popup, server_success: { visible: false }})}}  
        />

        <Prompt 
            open={popup.prompt.visible} 
            title="Are you sure?"
            message={popup.prompt.message}
            onClose={() => {setPopup({...popup, prompt: { visible: false }})}}  
            onConfirm={() => {handleConfirmChangeEmail()}}
        />
    </div>);
}