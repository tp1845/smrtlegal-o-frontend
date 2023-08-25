import { useEffect, useState } from "react";

export default function DescriptionBox({ title = 'Description box', description }) {
    const maxSize = 125
    const [cut, setCut] = useState(description.length > maxSize);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (description.length) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }, [description])

    const handleCut = () => {
        setCut( ! cut);
    }

    const handleToggle = () => {
        setToggle(! toggle)
    }

    return (
        <div>
            <div className={`relative flex bg-[#297FFF] text-white text-[14px] font-bold p-[16px] rounded-t-[6px] ${ toggle ? 'rounded-b-[6px]' : ''}`}>
                { title }
                <a 
                    href="#" 
                    className="absolute top-[50%] right-[15px] text-[20px] translate-y-[-50%]" 
                    onClick={(e) => {e.preventDefault(); handleToggle()}}>
                        {
                            ! toggle ? 
                            <span>&#8722;</span> : <span>&#43;</span>
                        }
                </a>
            </div>
            {
                ! toggle ? (
                    <div className="text-[12px] text-[#222] p-[16px] bg-white rounded-b-[6px]">
                        <h3 className="mb-3 font-bold">Description</h3>
                        {
                            description.slice(0, (cut ? maxSize : description.length))
                        }
                        {
                            cut && description.length > maxSize? '...' : ''
                        }
                        {
                            (description.length > maxSize) ? 
                            <div className="mt-3">
                                <a href="#" onClick={(e) => {e.preventDefault(); handleCut()}} className="text-[#1860CC]  underline underline-2">Show {cut ? 'more' : 'less'}</a>
                            </div> : <></>
                        }
                    </div>
                ) : <></>
            }
        </div>
    );
}