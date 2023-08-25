"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import Input from '@/components/input';
import Button from '@/components/button';
import GoogleAuthBtn from '@/components/google-auth-btn';
import * as api from '@/api'
import { validation } from '@/utils/validation'
import Link from 'next/link';
 
import VerifyEmailAddress from '@/popups/verify-email-address';
import ServerError from '@/popups/server-error';
import EmailVerified from '@/popups/email-verified'

export default function SignUpByInvitation() {
    const [errors, setErrors] = useState({
        'email': [],
        'password': [],
        'confirm_password': [],
        'terms_and_conditions': [],
    });

    const [popup, setPopup] = useState({
        verify_email_address: {
            visible: false,
        },
        server_error: {
            visible: false,
            message: '',
        },
        email_verified: {
            visible: false,
        }
    })

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm_password: '',
        terms_and_conditions: false
    })

    const rules = {
        email: ['email','required'],
        password: ['password','required', 'strong-password'],
        confirm_password: ['required', `confirm:${form.password}`],
        terms_and_conditions: ['terms_and_conditions']
    }

    const handleSignUp = () => {
        let messages = {}
        for(let field in rules) {
            let message = validation(form[field], rules[field]);
            messages[field] = message
        }

        setErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            const team = location.pathname.split('/').pop();
            api.signup({
                    ...form, 
                    redirect: `${location.protocol + "//" + location.host}`,
                    team,
                })
                .then(res => res.json())
                .then((data) => {
                    const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length || data.exception) {
                        const message = Object.values(errors).flat(1).join(' ') || data.message
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
                        verify_email_address: {
                            visible: true,
                        }
                    })
                })
        }
    }

    const handleTermsAndConditions = (event) => {
        const value = event.target.checked
        setForm({
            ...form,
            terms_and_conditions: value
        })

        if (value) {
            setErrors({
                ...errors,
                terms_and_conditions: []
            })
        }
    }

    const onChange = (field, value, rules) => {
        setForm({
            ...form,
            [field]: value
        })

        setErrors({
            ...errors,
            [field]: []
        })

        const messages = validation(value, rules);
        
        if (messages.length) {
            setErrors({
                ...errors,
                [field]: [...messages]
            })
        }
    }
    
    const handleResend = () => {
        api.resend({
            redirect: `${location.protocol + "//" + location.host}`,
            email: form.email
        })
    }

    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const hasEmail = url.get('email');
        
        if (hasEmail) {
            setForm({
                ...form,
                email: hasEmail
            })
            window.history.pushState({}, document.title, location.pathname);
        }
    }, []);

    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px] px-[30px] lg:px-0'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Sign up by invitation</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>You’re invited to join the team, in order to continue, please enter your detail belows. </p>
            <div className="mb-[20px]">
                <Input 
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    value={form.email}
                    errors={errors.email}
                    disabled="disabled"
                    readOnly="readonly"
                    onInput={(e) => onChange('email', e.target.value, rules.email)}
                    z-index="1"
                ></Input>
            </div>
            <div className="mb-[20px]">
                <Input 
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    value={form.password}
                    errors={errors.password}
                    onInput={(e) => onChange('password', e.target.value, rules.password)}
                    z-index="2"
                ></Input>
            </div>
            <div>
                <Input 
                    label="Confirm password"
                    placeholder="Enter password"
                    type="password"
                    value={form.confirm_password}
                    errors={errors.confirm_password}
                    onInput={(e) => onChange('confirm_password', e.target.value, rules.confirm_password)}
                    z-index="3"
                ></Input>
            </div>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Sign Up"
                    onClick={handleSignUp}
                    className="bg-[#1860CC]"
                ></Button>
            </div>
            {/* <div className="mb-[18px]">
                <GoogleAuthBtn />
            </div> */}
            <label className='mb-[14px]'>
                <span className='text-[#222] text-[14px]'>
                    <div className="mb-4 inline-block lg:flex items-center justify-center">
                        <input id="default-checkbox" type="checkbox" onChange={handleTermsAndConditions} value="" className={`w-[20px] h-[20px] text-blue-600 bg-gray-100 border-[#D4D4D4] rounded focus:ring-blue-500 focus:ring-2 mr-[17px]`} />
                        I agree with the&nbsp; <Link  href='/terms-and-conditions-and-privacy-policy' className='text-[#1860CC] underline underline-offset-2'>Terms of Use </Link>&nbsp; and&nbsp; <Link  href='/terms-and-conditions-and-privacy-policy?tab=privacy-policy' className='text-[#1860CC] underline underline-offset-2'> Privacy Policy</Link>
                    </div>
                    
                    {
                        errors.terms_and_conditions.length ? 
                            <p className="mt-[8px] text-left mx-auto max-w-[400px] flex items-center border-l-2 border-l-[#D94042] text-[12px] shadow-sm text-[#D94042]  bg-white right-[0] px-3 py-2">
                            <div className='w-[13px] h-[13px] min-w-[13px] mr-2'>
                                <svg fill='#D94042' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                            </div>
                            <span dangerouslySetInnerHTML={{__html: errors.terms_and_conditions.join('<br />')}}></span>
                        </p> 
                        :<></>
                    }
                </span>
            </label>
            <span className='text-[#222] text-[14px] mb-[50px]'>Already have an account? <Link href="/signin" className='text-[#1860CC]  underline underline-offset-2'>Sign in</Link></span>
        </div>

        <VerifyEmailAddress 
            open={popup.verify_email_address.visible}
            title="Verify email address"
            onClose={() => {setPopup({...popup, verify_email_address: { visible: false }})}}
            handleResend={handleResend}
        />

        <ServerError 
            open={popup.server_error.visible} 
            title="Error"
            message={popup.server_error.message}
            onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
        />

        <EmailVerified
            open={popup.email_verified.visible} 
            title="Email verified"
            onClose={() => {setPopup({...popup, email_verified: { visible: false }})}}
        />
    </div>);
}