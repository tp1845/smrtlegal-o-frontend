import { useEffect, useState } from "react";

export default function Select(props) {
    let { label, options, value, onSelect, children, className, icon = false } = props
    const [open, setOpen] = useState(false);

    value = value || {label: '', value: {}}

    const handleClick = (option) => {
        onSelect(option)
        setOpen(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if ( ! event.target.classList.contains('select') && ! event.target.closest('.select')) {
                setOpen(false)
            }
        }, false);
    }, [])

    return (<div className={`relative select ${open ? 'open': ''}`}>
        {
            label ? 
            <label 
                className={`block mb-2 text-sm font-Eina03 font-bold`}
                >{label}</label> : ""
        }
        {
            icon ? (
                <a href="#" onClick={(e) => { e.preventDefault(); setOpen(! open); }}>
                    {
                        icon()
                    }
                </a>
            ) : (
                <div onFocus={() => setOpen(! open)} onClick={() => {  setOpen(! open); }} className={`border bg-white rounded-[6px] w-full flex items-center justify-between py-[10px] px-[12px] cursor-pointer ${className}`} >
                    <div className={`text-[14px] mr-[10px] font-Eina03 text-[#B8C2CC]`}>
                        { value.label }
                    </div>
                    <svg className={`ml-auto transition-all ${open ? 'rotate-[-90deg]' : 'rotate-[-180deg]'}`} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6L6 1L11 6" stroke="#737373" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            )
        }
        <div className={`${ ! open ? 'hidden' : ''} dropdown max-h-[200px]  overflow-y-auto absolute z-[9999] left-[0] w-fit bg-white mt-[6px] rounded-[6px] shadow  p-[12px] text-[#222] text-[14px] font-Eina03`}>
            {
                options.map((option, index) => {
                    return (
                        <div 
                            key={index}
                            onClick={() => handleClick(option)} 
                            className={`p-[12px] whitespace-nowrap cursor-pointer ${ ! option.value ? 'text-[#B8C2CC]': ''} ${option.value == value.value ? 'bg-[#F7FAFF] border-b border-b-[#E5E5E5] border-t border-t-[#E5E5E5]' : ''}`}>
                            { option.label }
                        </div>
                    );
                })
            }
            {
                children
            }
        </div>
    </div>);
}