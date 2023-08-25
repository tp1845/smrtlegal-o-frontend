"use client";

import React, { useState } from 'react';

import OpenEyeSVG from '@/assets/eye-open.svg';
import CloseEyeSVG from '@/assets/eye-close.svg';
import Image from 'next/image';

export default function Input(props) {
    let { label, icon, className, zIndex, readonly } = props
    const errors = props.errors || []

    const [showPassword, setShowPassword] = useState(false);
    const [payload, setPayload] = useState(false);

    const handleClick = () => {
        if ( ! readonly) {
            setShowPassword( ! showPassword)
        }
    }

    const onChange = (event) => {
        setPayload(event.target.value);
    }
  return (
    <div className="text-left z-[999]">
        {
            label ? 
            <label 
                htmlFor="success" 
                className="block mb-2 text-sm font-Eina03 font-bold"
                >{label}</label> : ""
        }
        <div className={`relative ${zIndex}`}>
            <input
                id="success"
                {...props}
                className={`border text-[14px] rounded-[6px] block w-full p-2.5 focus:outline outline-[4px] outline-[#D3E4FE] ${ ! errors.length ? 'focus:border-[#1860CC]' : 'focus:border-[#D94042]' } ${className}`}
                type={showPassword ? 'text' : props.type}
            />
            {
                ['password'].includes(props.type) ? 
                (<Image 
                    src={showPassword ? OpenEyeSVG : CloseEyeSVG} 
                    alt="eye" 
                    width="20" 
                    height="20" 
                    className='absolute right-[12px] top-[50%] translate-y-[-50%] cursor-pointer'
                    onClick={handleClick}
                />) : <></>
            }
            {
                icon ? (<Image 
                    src={icon} 
                    alt="eye" 
                    width="13" 
                    height="13" 
                    className='absolute right-[12px] top-[50%] translate-y-[-50%] cursor-pointer'
                />) : <></>
            }
            {
                errors.length ? 
                <div className="z-[999] mt-[8px] flex items-center border-l-2 border-l-[#D94042] text-[12px] shadow-sm text-[#D94042] absolute left-[0]  bg-white right-[0] px-3 py-2">
                    <div className='w-[13px] h-[13px] min-w-[13px] mr-2'>
                        <svg  fill='#D94042' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                        </svg>
                    </div>
                    <span dangerouslySetInnerHTML={{__html: errors.join(' ')}}></span>
                </div> : <></>
            }
        </div>
    </div>
  );
}