import React, { useState, useEffect } from "react";
export default function Projectprogress({ type }) {

    const [status, setStatus] = useState(type || 'internalapproval');

    const themes = {
        internalapproval: 'text-white bg-[#75DD7F]',
        inprogress: 'bg-[#E5FFE8] border-[#75DD7F] text-[#75DD7F] border',
        overdue: 'bg-[#FBE3E2] border-[#D94042] text-[#D94042] border',
        newversionreceived: 'text-white bg-[#297FFF]',
        tosign: 'text-white bg-[#FF9C64]',
        new: 'text-[#7A2CB8] bg-[#F2EBF8]',
        newversion: 'text-[#7A2CB8] bg-[#F2EBF8] font-Eina03',
    }
    return (
        <div
            className='rounded-[4px] text-[#1CA38A] bg-[#ecf8f6] p-[5px] h-[33px] text-[15px] mt-[3px]'
            style={{ textTransform: 'uppercase' }}>
            {status}
        </div>
    );
}