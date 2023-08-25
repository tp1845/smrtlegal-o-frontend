import { useState } from "react";

export default function Alert({ type, message }) {
    type = type || 'error'

    const [show, setShow] = useState(true)

    const themes = {
        error: {
            bg: 'bg-[#FBE3E2]',
            text: '#D94042',
            border: 'border-[#D94042]'
        },
        success: {
            bg: 'bg-[#27D29E]',
            text: '#27D29E',
            border: 'border-[#27D29E]'
        }
    }

    const handleClose = () => {
        setShow( ! show)
    }

    return (<div className={`grid grid-cols-[30px_1fr] ${show ? 'grid' : 'hidden'} ${themes[type].bg} relative  border ${themes[type].border} p-[18px] rounded-[6px]`}>
                <div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill={themes[type].text} />
                    </svg>
                </div>
                <p className={`text-[${themes[type].text}] text-[12px]`}>
                    {message}
                </p>
                <a href="#" onClick={(e) => {e.preventDefault(); handleClose(); }} className="absolute top-[10px] right-[10px]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.63381 1.36597L1.36523 8.63454" stroke={themes[type].text} strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.36523 1.36597L8.63381 8.63454" stroke={themes[type].text} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>)
}