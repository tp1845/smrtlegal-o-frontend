import Image from "next/image";
import timesSVG from "@/assets/times.svg"
import "./wrapper.css"

export default function WrapperModal({ className = '', children, open, title, icon, onClose }) {
    
    return (
        <div className={`${open ? 'open' : ''}  wrapper-modal fixed left-[0] top-[0] bottom-[0] right-[0] min-w-full min-h-screen `}>
            <dialog open={open} onClose={(e) => {e.preventDefault(); onClose();}} className={`bg-white z-[2] max-w-[518px] min-w-[518px] rounded shadow fixed top-[50%] translate-y-[-50%] ${className}`}>
                <div className="title text-[20px] font-bold text-[#222] mb-[16px] flex items-center justify-between">
                        {
                            icon ? (<Image src={ icon } alt="time" width="25" height="25"  className="mr-[10px]"/>) : <></>
                        }
                        <h3 className="">{ title }</h3>
                        <a href="#" className="times" onClick={(e) => {e.preventDefault(); onClose()}}>
                            <Image src={ timesSVG } alt="time" width="24" height="24" />
                            </a>
                        </div>
                    { children }
            </dialog>
            {
                open ? (
                    <div onClick={(e) => {e.preventDefault(); onClose()}} className="overlay fixed left-0 top-0 bottom-0 right-0  w-full h-full z-[9999]"></div>
                ) : <></>
            }
        </div>
    );
}