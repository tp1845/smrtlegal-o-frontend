'use client';

import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import Input from '@/components/input';
import Button from '@/components/button';

import React, { useState } from 'react';

import * as api from '@/api'
import { validation } from '@/utils/validation'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';


import { useRouter } from 'next/navigation'


export default function Reset() {
    const { push } = useRouter();

    const [errors, setErrors] = useState({
        'password': [],
        'confirm_password': [],
    });

    const [form, setForm] = useState({
        password: '',
        confirm_password: '',
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
    })


    const rules = {
        password: ['password','required', 'strong-password'],
        confirm_password: ['required'],
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

    const handleReset = (field) => {
        let messages = {}
        for(let field in rules) {
            let message = validation(form[field], rules[field]);
            messages[field] = message
        }

        setErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            const hash = location.pathname.split('/').pop()
            api.reset({
                ...form,
                hash
            })
                .then(data => data.json())
                .then(data => {
                    const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length || data.exception) {
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

                    location.href = "/signin"
                })
            }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleReset();
        }
    };

    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px] px-[30px] lg:px-0'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Reset your password</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>
              Choose a new password for your account
            </p>
            <div className="mb-[20px]">
                <Input 
                    label="New Password"
                    placeholder="Enter password"
                    type="password"
                    value={form.password}
                    errors={errors.password}
                    onInput={(e) => onChange('password', e.target.value, rules.password)}
                    onKeyDown={handleKeyDown}
                ></Input>
            </div>
            <div className="mb-[20px]">
                <Input 
                    label="Confirm new password"
                    placeholder="Enter password"
                    type="password"
                    value={form.confirm_password}
                    errors={errors.confirm_password}
                    onInput={(e) => onChange('confirm_password', e.target.value, [...rules.confirm_password, `confirm:${form.password}`])}
                    onKeyDown={handleKeyDown}
                ></Input>
            </div>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Reset password"
                    className="bg-[#1860CC]"
                    onClick={handleReset}
                ></Button>
            </div>
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
    </div>);
}