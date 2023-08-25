'use client'

import { useState } from "react";
import Button from "./button";
import Select from "./select";
import moment from 'moment'
// import CalendarReact from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import dynamic from 'next/dynamic'

const CalendarReact = dynamic(
    () => import('react-calendar'),
    { ssr: false }
)
export default function Calendar({ onSave, duedate = null, reminder = null, reminderMode = false, onClose }) {
    const handleSave = () => {
        onSave(value)
    }

    const [value, onChangeRange] = useState(reminderMode ? reminder :  duedate);
        
    const months = [
        {
            label: "Jan",
            value: 'jan'
        },
        {
            label: "Feb",
            value: 'feb'
        },
        {
            label: "Mar",
            value: 'mar'
        },
        {
            label: "Apr",
            value: 'apr'
        },
        {
            label: "May",
            value: 'may'
        },
        {
            label: "Jun",
            value: 'jun'
        },
        {
            label: "Jul",
            value: 'jul'
        },
        {
            label: "Aug",
            value: 'aug'
        },
        {
            label: "Sep",
            value: 'sep'
        },
        {
            label: "Oct",
            value: 'oct'
        },
        {
            label: "Nov",
            value: 'nov'
        },
        {
            label: "Dec",
            value: 'dec'
        },
    ]

    const options = {
        locale: 'en',
        selectRange: false,
        tileDisabled: ({activeStartDate, date, view}) => {
            if (reminderMode) {
                return moment(date).isSame(moment(duedate), 'day')
            }
        },
    }

    const handleChange = (value) => {
        if (reminderMode) {
            const mDuedate = moment(duedate)
            const mReminder = moment(value)

            if (mDuedate.diff(mReminder) > 0 && mReminder > new Date()) {
                onChangeRange(value)
            }
            return ;
        }
        if (value > new Date()) {
            onChangeRange(value)
        }
    }

    return (<div className="shadow p-[24px] rounded-[6px] min-w-[320px] max-w-[320px] bg-white">
                <div className="flex items-center">
                    <h3 className="text-[16px] font-Eina03 font-bold ">Calendar</h3>
                    <a href="#" className="ml-auto">
                        <svg onClick={(e) => {e.preventDefault(); onClose()}} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0003 1.35718H6.00028C3.15996 1.35718 0.857422 3.65971 0.857422 6.50003V18.5C0.857422 21.3404 3.15996 23.6429 6.00028 23.6429H18.0003C20.8406 23.6429 23.1431 21.3404 23.1431 18.5V6.50003C23.1431 3.65971 20.8406 1.35718 18.0003 1.35718Z" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.6338 8.86597L8.36523 16.1345" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.36523 8.86597L15.6338 16.1345" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
                <div className="py-[16px]">
                    <div className="my-[16px] rounded-lg shadow">
                            <CalendarReact  
                                {...options} 
                                tileClassName={reminderMode ? 'reminder-setting-tile' : ''} 
                                value={value} 
                                onChange={handleChange} 
                            />

                            <div className="flex items-center text-[10px] justify-around border-t p-4">
                                {
                                    reminderMode ? (
                                        <div className="flex items-center">
                                            <div className="mr-[5px] w-[37px] text-[14px] h-[37px] text-white flex items-center justify-center rounded-full bg-[#FD7983]">00</div>
                                            Reminder date
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <div className="relative mr-[5px] w-[37px] !text-[#222] text-[14px] h-[37px] text-white flex items-center justify-center rounded-full bg-white">
                                                00
                                                <span className="rounded-full w-[5px] h-[5px] absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#297FFF]"></span>
                                            </div>
                                            Today
                                        </div>
                                    )

                                }
                                <div className="flex items-center">
                                    <div className="mr-[5px] w-[37px] text-[14px] h-[37px] text-white flex items-center justify-center rounded-full bg-[#4ECFE0]">00</div>
                                    Due Date
                                </div>
                        </div>
                    </div>
                </div>
                <Button label="Save" {...{disabled: !value}}  className="bg-[#1860CC] text-white text-[12px]" onClick={handleSave} />
        </div>);
}