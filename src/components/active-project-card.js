'use client'
import { useRouter } from "next/navigation";
import Select from "./select";
import Collaborators from "./collaborators";

export default function ActiveProjectCard({ project, options }) {
    const {push} = useRouter();

    const optionIcon = () => {
       return (
            <div className="w-4 h-4">
                <svg className="w-full h-full" width="4" height="17" viewBox="0 0 4 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.71373 8.76618C2.71373 8.37169 2.39393 8.0519 1.99944 8.0519C1.60495 8.0519 1.28516 8.37169 1.28516 8.76618C1.28516 9.16067 1.60495 9.48047 1.99944 9.48047C2.39393 9.48047 2.71373 9.16067 2.71373 8.76618Z" stroke="#8792A8" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.71373 15.1946C2.71373 14.8002 2.39393 14.4804 1.99944 14.4804C1.60495 14.4804 1.28516 14.8002 1.28516 15.1946C1.28516 15.5891 1.60495 15.9089 1.99944 15.9089C2.39393 15.9089 2.71373 15.5891 2.71373 15.1946Z" stroke="#8792A8" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.71373 2.33747C2.71373 1.94298 2.39393 1.62319 1.99944 1.62319C1.60495 1.62319 1.28516 1.94298 1.28516 2.33747C1.28516 2.73196 1.60495 3.05176 1.99944 3.05176C2.39393 3.05176 2.71373 2.73196 2.71373 2.33747Z" stroke="#8792A8" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
       );
    }

    const handleSelectOption = (option) => {
        push('/active-projects/' + project.id + '/' + option.value)
    }

    const getOwner = (team) => {
        const members = team && team.members || []
        const [lead] = members
        return lead && lead.fname + ' ' + lead.lname || lead?.email
    }

    return (<div className="rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[14px] font-bold text-[#222] flex items-center">
                        <span style={{backgroundColor: '#' + project.color}} className="flex w-[15px] h-[15px] rounded-full mr-2"></span>
                        { project.name }
                    </h3>
                    <Select 
                        options={options} 
                        icon={optionIcon} 
                        onSelect={handleSelectOption} 
                    />
                </div>
                <hr className="mb-3" />
                <div className="flex flex-col">
                    <div className="grid grid-cols-[1fr_1fr] gap-3 mb-2">
                        <div className="text-[#B8C2CC] text-[12px] font-bold flex items-center">
                            <svg className="mr-2" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_101_11607)">
                                <path d="M1.5 2.62329C1.23478 2.62329 0.98043 2.72865 0.792893 2.91618C0.605357 3.10372 0.5 3.35807 0.5 3.62329V12.6233C0.5 12.8885 0.605357 13.1429 0.792893 13.3304C0.98043 13.5179 1.23478 13.6233 1.5 13.6233H12.5C12.7652 13.6233 13.0196 13.5179 13.2071 13.3304C13.3946 13.1429 13.5 12.8885 13.5 12.6233V3.62329C13.5 3.35807 13.3946 3.10372 13.2071 2.91618C13.0196 2.72865 12.7652 2.62329 12.5 2.62329H10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.5 6.62329H13.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3.5 0.623291V4.62329" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.5 0.623291V4.62329" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3.5 2.62329H8.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_101_11607">
                                <rect width="14" height="14" fill="white" transform="translate(0 0.123291)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            Date
                        </div>
                        <div className="text-[#222] text-[12px]">
                            { project.due_date }
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] gap-3 mb-2">
                        <div className="text-[#B8C2CC] text-[12px] font-bold flex flex-center">
                            <svg className="mr-2" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_101_11618)">
                                    <path d="M9.5 1.62329H11C11.2652 1.62329 11.5196 1.72865 11.7071 1.91618C11.8946 2.10372 12 2.35807 12 2.62329V12.6233C12 12.8885 11.8946 13.1429 11.7071 13.3304C11.5196 13.5179 11.2652 13.6233 11 13.6233H3C2.73478 13.6233 2.48043 13.5179 2.29289 13.3304C2.10536 13.1429 2 12.8885 2 12.6233V2.62329C2 2.35807 2.10536 2.10372 2.29289 1.91618C2.48043 1.72865 2.73478 1.62329 3 1.62329H4.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.5 0.623291H5.5C4.94772 0.623291 4.5 1.07101 4.5 1.62329V2.12329C4.5 2.67558 4.94772 3.12329 5.5 3.12329H8.5C9.05228 3.12329 9.5 2.67558 9.5 2.12329V1.62329C9.5 1.07101 9.05228 0.623291 8.5 0.623291Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.5 5.62329H9.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.5 8.12329H9.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.5 10.6233H9.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_101_11618">
                                <rect width="14" height="14" fill="white" transform="translate(0 0.123291)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            Doc Type
                        </div>
                        <div className="text-[#222] text-[12px]">
                            { project?.document?.type }
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] gap-3 mb-2">
                        <div className="text-[#B8C2CC] text-[12px] font-bold flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.00105 8.04629C8.27555 8.04629 9.30874 7.0131 9.30874 5.7386C9.30874 4.4641 8.27555 3.43091 7.00105 3.43091C5.72655 3.43091 4.69336 4.4641 4.69336 5.7386C4.69336 7.0131 5.72655 8.04629 7.00105 8.04629Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3.05859 11.6463C3.47051 10.9701 4.04943 10.4113 4.73971 10.0236C5.42998 9.6358 6.2084 9.43213 7.00013 9.43213C7.79186 9.43213 8.57028 9.6358 9.26056 10.0236C9.95083 10.4113 10.5298 10.9701 10.9417 11.6463" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 13.1233C10.3137 13.1233 13 10.437 13 7.12329C13 3.80958 10.3137 1.12329 7 1.12329C3.68629 1.12329 1 3.80958 1 7.12329C1 10.437 3.68629 13.1233 7 13.1233Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Owner
                        </div>
                        <div className="text-[#222] text-[12px]">
                            {getOwner(project.team)}
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <div className="text-[#B8C2CC] text-[12px] font-bold flex items-center">
                            <svg className="mr-2" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 10.6233V12.6233C13.5 12.8885 13.3946 13.1429 13.2071 13.3304C13.0196 13.5179 12.7652 13.6233 12.5 13.6233H10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.5 0.623291H12.5C12.7652 0.623291 13.0196 0.728648 13.2071 0.916184C13.3946 1.10372 13.5 1.35807 13.5 1.62329V3.62329" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M0.5 3.62329V1.62329C0.5 1.35807 0.605357 1.10372 0.792893 0.916184C0.98043 0.728648 1.23478 0.623291 1.5 0.623291H3.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3.5 13.6233H1.5C1.23478 13.6233 0.98043 13.5179 0.792893 13.3304C0.605357 13.1429 0.5 12.8885 0.5 12.6233V10.6233" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 6.62329C8.10457 6.62329 9 5.72786 9 4.62329C9 3.51872 8.10457 2.62329 7 2.62329C5.89543 2.62329 5 3.51872 5 4.62329C5 5.72786 5.89543 6.62329 7 6.62329Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.1598 10.6234C9.87547 10.0262 9.4277 9.52184 8.86843 9.16872C8.30916 8.81559 7.66127 8.62817 6.99984 8.62817C6.33842 8.62817 5.69053 8.81559 5.13126 9.16872C4.57198 9.52184 4.12422 10.0262 3.83984 10.6234" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Team
                        </div>
                        <div className="text-[#222] text-[12px]">
                            { project?.team?.name }
                        </div>
                    </div>
                    <div className="pb-8 pt-2">
                        <Collaborators project={project} />
                    </div>
                </div>
            </div>);
}