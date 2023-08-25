'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import Button from '@/components/button';


import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';

import * as api from '@/api'

export default function Reset() {
    
    const [email, setEmail] = useState('');

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


    const handleResend = () => {
        const form = {
            'email': email,
            'link': location.protocol + '//' + location.host
        }

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

            setPopup({
                ...popup,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })
        })
    }

    useEffect(() => {
        const url = new URL(location.href);
        const param = url.searchParams.get("email");
        if (param) {
            setEmail(param)
        }
    }, [])

    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px] px-[30px] lg:px-0 flex items-center'>
        <div className='container text-center flex flex-col min-h-full justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Check your email</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>
                We have sent an email with password reset information to {email}
            </p>
            <p className='text-[14px] text-[#222]'>
                Didn’t receive the email? 
                Please check your spam or promotion folder or
            </p>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Resend email"
                    className="bg-[#1860CC]"
                    onClick={handleResend}
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