import { useEffect, useState } from "react";
import Input from "./input";

import { getAttrFromName } from '@/utils/helpers'
import Select from "./select";
import { useNewProject } from "@/context/new-project";
import Info from "./info";

export default function MemberAdd({ label, roles, onUpdate, value, subtitle = '', open = false, disabledRoles = [], exclude = [], withLead = false}) {
    const [members, setMembers] = useState([...value])
    const [member, setMember] = useState({
        name: '',
        email: '',
        role: null
    })
    const [toggle, setToggle] = useState(open)

    let {project, setProject}  = {project: {}, setProject: () => {}}
    let newProject = useNewProject();
    if (newProject && Object.keys(newProject).length) {
        project = newProject.project
        setProject = newProject.setProject
    }
    
    const onChange = (field, value) => {
        setMember({
            ...member,
            [field]: value
        })
    }

    const regexpEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const canAdd = () => {
        const filled = !member.name || !member.email ? true: false
        const exist = members.find(item => item.email == member.email)
        const isEmail = regexpEmail.test(member.email)
        const isExclude = exclude.find(item => item.email == member.email)
        return ! filled && ! exist && isEmail && ! isExclude
    }

    useEffect(() => {
        setToggle(value && value.length)
        setMembers([...value])
    }, [value])

    useEffect(() => {
        setToggle(open)
    }, [open])

    const handleAdd = (e) => {
        e.preventDefault();
        if (canAdd()) {
            const defaultRole = roles[0] ?? false
            const newList = [
                ...members,
                {
                    ...member,
                    role: defaultRole
                }
            ]
            setMembers(newList)
            onUpdate(newList);
            setMember({
                name: '',
                email: '',
                role: null
            })
        }
        
    }

    const handleRemoveMember = (index) => {
        const newList = [
            ...members.filter((member, targetIndex) => {
                if (targetIndex != index) {
                    return true
                }
                return false
            })
        ]
        setMembers(newList)
        onUpdate(newList);
    }

    const handleUpdateRoleMember = (targetMember, role) => {
        const newList = [...members.map(member => {
            if (member.email == targetMember.email) {
                return {
                    ...member,
                    role: role
                }
            }
            return member
        })]

        setMembers(newList)
        onUpdate(newList);
    }

    const updateLeads = (member) => {
        if ( ! project.leads[member.email]) {
            project.leads[member.email] = false
        }

        project.leads[member.email] = ! project.leads[member.email]
        setProject({
            ...project,
            leads: {...project.leads},
        })
    }

    return (
        <>
            <h3 className="relative font-Eina03 font-bold text-[14px] text-[#222] mt-[56px] mb-[24px] flex items-center">{label}
            <span className="absolute bottom-[-17px] left-0 text-[12px] text-[#888] font-normal">{subtitle}</span>
                <a href="#" className="ml-auto" onClick={(e)=> {e.preventDefault(); setToggle( ! toggle) }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_49_9784)">
                            {
                                ! toggle ? (
                                    <path d="M12 6.85718V17.1429" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                ) : <></>
                            }
                            <path d="M6.85742 12H17.1431" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.0003 0.857178H6.00028C3.15996 0.857178 0.857422 3.15971 0.857422 6.00003V18C0.857422 20.8404 3.15996 23.1429 6.00028 23.1429H18.0003C20.8406 23.1429 23.1431 20.8404 23.1431 18V6.00003C23.1431 3.15971 20.8406 0.857178 18.0003 0.857178Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_49_9784">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </a>
                
            </h3>
            
            {
                toggle ? (
                    <div>
                        <div className='grid grid-cols-[210px_1fr_100px] gap-[16px] mb-[24px]'>
                            <div>
                                <Input 
                                    placeholder="Full name"
                                    name="name"
                                    className="text-[14px] placeholder:text-[14px]"
                                    onInput={(e) => { onChange('name', e.target.value);  }}
                                    value={member.name}
                                />
                            </div>
                            <div>
                                <Input 
                                    placeholder="Email address"
                                    className="text-[14px] placeholder:text-[14px]"
                                    type="email"
                                    name="email"
                                    onInput={(e) => { onChange('email', e.target.value);  }}
                                    value={member.email}
                                />
                            </div>
                            <a href="#" onClick={handleAdd}  className={`font-bold font-Eina03 inline-block ${ ! canAdd() ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white text-[12px] rounded-[6px] py-[12px] text-center`}>
                                Add
                            </a>
                        </div>
                        {
                            members.map((member, key) => {
                                return (

                                    <div className="grid grid-cols-[210px_1fr_85px] gap-[16px] mb-[12px] font-Eina03 text-[14px]" key={`${key}`}>
                                        <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                                            <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter">
                                                
                                                {
                                                    member.user && member.user.avatar ? 
                                                    <img src={member.user.avatar} className="w-full h-full object-contain" />
                                                    :
                                                    getAttrFromName(member.name ? member.name : member.email)
                                                }
                                            </div>
                                            <h3>{ member.name ? member.name : member.email }</h3>
                                        </div>
                                        <div className="flex items-center rounded-[6px] py-[10px] px-[12px] bg-white">
                                            { member.email }
                                            {
                                                roles.length ? (
                                                    <div  className="ml-auto  flex">
                                                        {
                                                            withLead ? (
                                                                <div>
                                                                    <label className="font-Eina03 text-[#222] flex items-center" onClick={(e) => { updateLeads(member) }}>
                                                                        <div className={`w-[18px] h-[18px] ${ project.leads[member.email]  ? 'bg-[#4ECFE0]' : 'border-2 border-[#D4D4D4]'} rounded-[3px] text-white flex items-center justify-center`}>
                                                                        {
                                                                            project.leads[member.email] ? (
                                                                                    <span>
                                                                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7851 1.31402C10.9568 1.47146 10.9684 1.73832 10.811 1.91007L4.62349 8.66007C4.54573 8.7449 4.43671 8.79428 4.32166 8.79678C4.20662 8.79928 4.09555 8.75468 4.01419 8.67331L1.20169 5.86081C1.03694 5.69606 1.03694 5.42894 1.20169 5.26419C1.36644 5.09944 1.63356 5.09944 1.79831 5.26419L4.29925 7.76513L10.189 1.33993C10.3465 1.16818 10.6133 1.15658 10.7851 1.31402Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                        </svg>
                                                                                    </span>
                                                                            ) : <></>
                                                                        }
                                                                        </div>
                                                                        <span className="cursor-pointer select-none ml-2" >
                                                                            Lead
                                                                            <div className="ml-3 inline-block">
                                                                                <Info type="project" />     
                                                                            </div>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            ) : <></>
                                                        }
                                                        <div className="ml-auto flex items-center">
                                                            <Select 
                                                                options={roles.filter(option => ! disabledRoles.includes(option.label))}
                                                                className="inline-block px-[10px] !text-[12px] border-none !py-[0]"
                                                                value={member.role}
                                                                onSelect={(event) => handleUpdateRoleMember(member, event)}
                                                            />
                                                            <div className="mr-auto">
                                                                <Info type="document" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : <></>
                                            }
                                        </div>
                                        <a href="#" onClick={(e) => {e.preventDefault(); handleRemoveMember(key)}} className="rounded-[6px] text-center border font-bold text-[12px] border-[#737373] text-[#737373] py-[10px] px-[12px] bg-white">
                                            Remove
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : <></>
            }
            <hr />
        </>
    );
}