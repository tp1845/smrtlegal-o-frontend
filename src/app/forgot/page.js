'use client';

import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import Input from '@/components/input';
import Button from '@/components/button';
import React, { useState, useEffect } from 'react';

import * as api from '@/api'
import { validation } from '@/utils/validation'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';

import { useRouter } from 'next/navigation'

import Link from 'next/link';
 

export default function Forgot() {
    const { push } = useRouter();

    const [errors, setErrors] = useState({
        'email': [],
    });

    const [form, setForm] = useState({
        email: '',
        link: '',
    });

    useEffect(() => {
        setForm({
            email: '',
            link: window.location.protocol + '//' +  window.location.host
        })
    }, []);

    const rules = {
        email: ['email','required'],
    }

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

    const handleSend = () => {
        let messages = {}
        for(let field in rules) {
            let message = validation(form[field], rules[field]);
            messages[field] = message
        }

        setErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            api.forgot(form)
                .then(data => data.json())
                .then(data => {
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

                    // reset?email=form.email
                    push(`/reset?email=${form.email}`)
                })
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };


    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px] px-[30px] lg:px-0'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Forgot password?</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>
            If you have an account, we have sent an email to 
            your following instructions on how to reset your 
            password.
            </p>
            <div className="mb-[20px]">
                <Input 
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    value={form.email}
                    errors={errors.email}
                    onInput={(e) => onChange('email', e.target.value, rules.email)}
                    onKeyDown={handleKeyDown}
                ></Input>
            </div>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Send"
                    className="bg-[#1860CC]"
                    onClick={handleSend}
                ></Button>
            </div>
            <span className='text-[#222] text-[14px]  mb-[10px]'>Already have an account? <Link href="/signin" className='text-[#1860CC]  underline underline-offset-2'>Sign in</Link></span>
            <span className='text-[#222] text-[14px]  mb-[50px]'>Don’t have an account? <Link href='/signup' className='text-[#1860CC]  underline underline-offset-2'>Sign up</Link></span>
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