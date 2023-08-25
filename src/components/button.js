"use client";

import Image from 'next/image';

export default function Button(props) {
    const { label, className, icon, disabled } = props
   return (
     <div>
        
        <button  {...props}  className={` ${className} relative text-white w-full py-[10px] rounded-[6px] font-bold flex items-center justify-center`} >
            {
                icon ? 
                <span className='mr-[10px]'>
                    <Image 
                        src={icon}
                        width="20"
                        height="20"
                        alt="icon" 
                    />
                </span> :<></>
            }
            {label}

            {
                disabled ? (
                    <div className='absolute top-[-1px] right-[-1px] left-[-1px] bottom-[-1px] rounded-[6px] bg-[#fff] opacity-[0.7]'></div>
                ) : <></>
            }
        </button>
     </div>
   );
 }