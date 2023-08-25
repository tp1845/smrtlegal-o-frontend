'use client'

import Toggle from "@/components/toggle"
import { useState } from "react";

export default function Accordion({ isOpen, label, items, handleChange }) {
    const [open, setOpen] = useState(isOpen || false);

    return (<div className="font-Eina03">
                <div className="flex justify-between">
                    <a href="#" className="inline-flex w-full items-center jusitfy-center" onClick={(e) => { e.preventDefault(); setOpen(!open); }}>
                        <h3 className="font-bold text-[18px] text-[#222]">{label}</h3>
                        <svg className={`ml-auto transition-all ${open ? 'rotate-[-90deg]' : 'rotate-[-180deg]'}`} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6L6 1L11 6" stroke="#737373" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
                <div className={`transition-all ${open ? 'hidden' : ''}`}>
                    {
                        items.map((item, index) => {
                            return (
                                <div key={index} className="flex justify-between items-center mt-[30px] text-[14px]">
                                    <label className="cursor-pointer select-none" htmlFor={`${label}-${index}`}>{item.label}</label>
                                    <Toggle index={`${label}-${index}`} value={item} handleChange={() => handleChange(item)} />
                                </div>
                            )
                        })
                    }
                </div>
                </div>);
    }