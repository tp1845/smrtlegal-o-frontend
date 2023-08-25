"use client";

import React, { useState } from 'react';


export default function Textarea(props) {
    const { label, className, maxlength, value } = props
    const errors = props.errors || []

    const [showPassword, setShowPassword] = useState(false);
    const [payload, setPayload] = useState(false);

    const handleClick = () => {
        setShowPassword( ! showPassword)
    }

    const onChange = (event) => {
        setPayload(event.target.value);
    }
    
  return (
    <div className="text-left z-[1]">
        {
            label ? 
            <label 
                htmlFor="success" 
                className="block mb-2 text-sm font-Eina03 font-bold"
                >{label}</label> : ""
        }
        <div className='relative z-[2]'>
            <textarea
                id="success"
                {...props}
                className={`border text-[14px] rounded-[6px] block w-full p-2.5 focus:outline outline-[4px] outline-[#D3E4FE] ${ ! errors.length ? 'focus:border-[#1860CC]' : 'focus:border-[#D94042]' } ${className}`}
                type={showPassword ? 'text' : props.type}
            ></textarea>
            {
                errors.length ? 
                <p className="mt-[8px] text-[12px] shadow-sm text-[#D94042] absolute left-[0] z-index-[3] bg-white right-[0] px-3 py-2" dangerouslySetInnerHTML={{__html: errors.join(' ')}}></p> : <></>
            }
            {
                maxlength ? (
                    <span className='text-[#B8C2CC] absolute top-[3px] bg-white right-[8px] text-[11px]'>{value && value.length ? value.length : 0}/{maxlength}</span>
                ): <></>
            }
        </div>
    </div>
  );
}