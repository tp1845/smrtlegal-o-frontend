import * as api from '@/api'
import React, { useState, useEffect } from "react";

// type field: ['newversion', 'inprogress', 'tosign', 'overdue', 'pending'?,]

export default function ProjectStatus({ id, type }) {
    const [status, setStatus] = useState(type || 'internalapproval');

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if(status === 'pending') {
            const interval = setInterval(() => {
                if (progress < 100) {
                    setProgress((prevProgress) => prevProgress + 1);
                } else if(progress === 100) {
                    setStatus('new');
                    api.update_project_status({id});
                    setProgress(101);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [progress]);

    const themes = {
        newversion: 'text-[#7A2CB8] bg-[#F2EBF8] w-[112px]',//
        inprogress: 'bg-[#ECF8F6] border-[#75DD7F] text-[#1CA38A] w-[112px]',//
        tosign: 'text-[EC9631] bg-[#FDF5EB] w-[74px]',//
        overdue: 'bg-[#F2EBF8] text-[#E3423D] w-[89px]',
        internalapproval: 'text-white bg-[#75DD7F]',
        new: 'text-[#7A2CB8] bg-[#F2EBF8] w-[112px]',//temp
    }

    const label = {
        newversion: 'new version',//
        inprogress: 'in progress',//
        tosign: 'to sign',//
        overdue: 'overdue!',
        internalapproval: '',
        new: 'new version',//temp
    }
    if(status === 'pending') {
        return (
            <>
                {/* <span>{ status }</span> */}
                <div className="w-full h-2 bg-gray-200 rounded">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </>
        )
    }else if(status === 'overdue'){//for fix opacity color
        return (
        <div 
            className={`${themes[status]} text-[12px] py-[3px] h-[28px] text-center font-Eina03 font-bold rounded-[4px] flex items-center w-full justify-center`}
            style={{ textTransform: 'uppercase' }}>
            { label[type] }
        </div>);
    }
    return (
    <div 
        className={`${themes[status]} text-[12px] py-[3px] h-[28px] text-center font-Eina03 font-bold rounded-[4px] flex items-center w-full justify-center`}
        style={{ textTransform: 'uppercase' }}>
        { label[type] }
    </div>);
}