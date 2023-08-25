import RequestChangePopUp from "@/popups/request-change";
import { getAttrFromName } from "@/utils/helpers";
import { useEffect, useState } from "react";

export default function Collaborators({ project, editable = true, roles = [] }) {
    const slice = 5;
    const [members, setMembers] = useState(project?.team?.members || [])
    let firstFive = members.slice(0, slice)
    let overFive = members.slice(slice, members.length)

    useEffect(() => {
        setMembers(project?.team?.members || [])
    }, [project])

    return (<div className="relative" >
                {
                    firstFive.map((member, index) => {
                        return (
                            <div key={index} style={{left: `${index * 20}px`, zIndex: index}} className={` cursor-pointer border-2 border-[white] absolute top-[50%] w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter`}>
                                {
                                    member && member.avatar ? 
                                    <img src={member.avatar} className="w-full h-full object-contain" />
                                    :
                                    getAttrFromName(member.fname ? member.fname + ' ' + member.lname : member.name)
                                }
                            </div>
                        )
                    })
                }
                {
                    overFive.length ? (
                        <div style={{left: `${firstFive.length * 20}px`}}  className={`z-[99]  border-2 border-[white] absolute top-[50%] w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter`}>
                            {overFive.length}+
                        </div>
                    ) : <></>
                }
                {
                    editable ? (
                        <a href="#" className="inline-block absolute right-[15px] p-2 rounded-full bg-[#1860CC]">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.1531 5.15367C6.30015 5.15367 7.23002 4.22384 7.23002 3.07683C7.23002 1.92983 6.30015 1 5.1531 1C4.00604 1 3.07617 1.92983 3.07617 3.07683C3.07617 4.22384 4.00604 5.15367 5.1531 5.15367Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.69231 12.0753H1V10.6907C1.00735 9.98717 1.1929 9.29696 1.53933 8.68457C1.88576 8.07217 2.38175 7.55757 2.98099 7.18882C3.58023 6.82007 4.26316 6.60922 4.96598 6.57595C5.66881 6.54268 6.3686 6.68807 7 6.99856" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.2305 7.46191V13.0001" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.46094 10.2305H12.9994" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    ) : <></>
                }
            </div>);
}