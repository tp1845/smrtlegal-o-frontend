import { useState } from "react";
import Card from "./card";
import Collaborators from "./collaborators";
import Textarea from "./textarea";
import * as api from '@/api'
import ServerError from "@/popups/server-error.js";
import ServerSuccess from "@/popups/server-success.js";
import RequestChangePopUp from "@/popups/request-change";


export default function ProjectDetailsInfo({ project, editable = true, roles }) {
    const [showRequestToChangePopUp, setShowRequestToChangePopUp] = useState(false)

    const [popup, setPopup] = useState({
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            visible: false,
            message: '',
        },
    })

    const handleChangeRole = (member) => {
        api.request_to_change_role({
            project: {
                value: project.id,
            },
            role: {
                value: member.pivot.role_id
            },
            user_id: member.id
        }).then((data) => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopup({
                    ...popup,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return ;
            }

            setPopup({
                ...popup,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })
        })
    }

    const handleClick = () => {
        setShowRequestToChangePopUp(true)
    }
    

    return (
        <div>
            <Card className="mb-[20px] px-[16px]">
                    <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mb-8">Project info.</h3>
                    <div className='text-[14px]'>
                        <div className='grid gap-[20px] grid-cols-[110px_1fr] mb-5'>
                            <div className='text-[#B8C2CC]  flex items-center'>
                                <svg className="mr-2" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 1.5H10C10.2652 1.5 10.5196 1.60536 10.7071 1.79289C10.8946 1.98043 11 2.23478 11 2.5V12.5C11 12.7652 10.8946 13.0196 10.7071 13.2071C10.5196 13.3946 10.2652 13.5 10 13.5H2C1.73478 13.5 1.48043 13.3946 1.29289 13.2071C1.10536 13.0196 1 12.7652 1 12.5V2.5C1 2.23478 1.10536 1.98043 1.29289 1.79289C1.48043 1.60536 1.73478 1.5 2 1.5H3.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.5 0.5H4.5C3.94772 0.5 3.5 0.947715 3.5 1.5V2C3.5 2.55228 3.94772 3 4.5 3H7.5C8.05228 3 8.5 2.55228 8.5 2V1.5C8.5 0.947715 8.05228 0.5 7.5 0.5Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.5 5.5H8.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.5 8H8.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.5 10.5H8.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Doc Type
                            </div>
                            <div className='text-[#405D80] font-bold'>{project.doctype}</div>
                        </div>
                        <div className='grid gap-[20px] grid-cols-[110px_1fr] mb-5'>
                            <div className='text-[#B8C2CC]  flex items-center'>
                                <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 2.5C1.23478 2.5 0.98043 2.60536 0.792893 2.79289C0.605357 2.98043 0.5 3.23478 0.5 3.5V12.5C0.5 12.7652 0.605357 13.0196 0.792893 13.2071C0.98043 13.3946 1.23478 13.5 1.5 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3946 13.0196 13.5 12.7652 13.5 12.5V3.5C13.5 3.23478 13.3946 2.98043 13.2071 2.79289C13.0196 2.60536 12.7652 2.5 12.5 2.5H10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M0.5 6.5H13.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.5 0.5V4.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.5 0.5V4.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.5 2.5H8.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Due Date
                            </div>
                            <div className='text-[#405D80] font-bold'>{project.due_date}</div>
                        </div>
                        <div className='grid gap-[20px] grid-cols-[110px_1fr] mb-5'>
                            <div className='text-[#B8C2CC]  flex items-center'>
                                <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.73008 7.64998L13.0001 5.53998C13.1274 5.46273 13.2359 5.358 13.3177 5.23345C13.3994 5.10889 13.4522 4.96766 13.4723 4.82006C13.4925 4.67246 13.4794 4.52224 13.434 4.38035C13.3886 4.23847 13.3121 4.10851 13.2101 3.99998L10.0001 0.789981C9.89155 0.687946 9.76159 0.611447 9.61971 0.566074C9.47782 0.5207 9.3276 0.507598 9.18 0.527725C9.0324 0.547851 8.89117 0.600699 8.76661 0.682405C8.64205 0.764111 8.53733 0.872613 8.46008 0.999981L6.30008 4.22998L1.81008 5.22998C1.7074 5.2549 1.61312 5.30648 1.53678 5.37952C1.46044 5.45256 1.40473 5.54447 1.37531 5.64595C1.34588 5.74742 1.34377 5.85487 1.36919 5.95742C1.39461 6.05998 1.44666 6.154 1.52008 6.22998L7.67008 12.39C7.74793 12.4604 7.84264 12.5096 7.94505 12.5327C8.04746 12.5558 8.15411 12.5521 8.25468 12.522C8.35524 12.4918 8.44631 12.4362 8.51909 12.3605C8.59186 12.2848 8.64387 12.1916 8.67008 12.09L9.73008 7.64998Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4.59 9.37988L0.5 13.4999" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Notes
                            </div>
                            <div className='text-[#405D80] font-bold'>{project.description}</div>
                        </div>
                        <div className='grid gap-[20px] grid-cols-[110px_1fr] mb-5'>
                            <div className='text-[#B8C2CC]  flex items-center'>
                                <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 10.5V12.5C13.5 12.7652 13.3946 13.0196 13.2071 13.2071C13.0196 13.3946 12.7652 13.5 12.5 13.5H10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.5 0.5H12.5C12.7652 0.5 13.0196 0.605357 13.2071 0.792893C13.3946 0.98043 13.5 1.23478 13.5 1.5V3.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M0.5 3.5V1.5C0.5 1.23478 0.605357 0.98043 0.792893 0.792893C0.98043 0.605357 1.23478 0.5 1.5 0.5H3.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.5 13.5H1.5C1.23478 13.5 0.98043 13.3946 0.792893 13.2071C0.605357 13.0196 0.5 12.7652 0.5 12.5V10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 6.5C8.10457 6.5 9 5.60457 9 4.5C9 3.39543 8.10457 2.5 7 2.5C5.89543 2.5 5 3.39543 5 4.5C5 5.60457 5.89543 6.5 7 6.5Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.1598 10.5001C9.87547 9.90292 9.4277 9.39855 8.86843 9.04543C8.30916 8.6923 7.66127 8.50488 6.99984 8.50488C6.33842 8.50488 5.69053 8.6923 5.13126 9.04543C4.57198 9.39855 4.12422 9.90292 3.83984 10.5001" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Team
                            </div>
                            <div className='text-[#405D80] font-bold'>
                                <a href="#" onClick={handleClick} className="text-[#297FFF] underline">
                                    {project?.team?.name}
                                </a>
                            </div>
                        </div>
                        <div className='grid gap-[20px] grid-cols-[110px_1fr]'>
                            <div  className='text-[#B8C2CC]  flex items-center'>
                                <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 6C6.24264 6 7.25 4.99264 7.25 3.75C7.25 2.50736 6.24264 1.5 5 1.5C3.75736 1.5 2.75 2.50736 2.75 3.75C2.75 4.99264 3.75736 6 5 6Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.5 13.5H0.5V12.5C0.5 11.3065 0.974106 10.1619 1.81802 9.31802C2.66193 8.47411 3.80653 8 5 8C6.19347 8 7.33807 8.47411 8.18198 9.31802C9.02589 10.1619 9.5 11.3065 9.5 12.5V13.5Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 1.5C9.59674 1.5 10.169 1.73705 10.591 2.15901C11.0129 2.58097 11.25 3.15326 11.25 3.75C11.25 4.34674 11.0129 4.91903 10.591 5.34099C10.169 5.76295 9.59674 6 9 6" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.5996 8.18994C11.4514 8.51399 12.1848 9.08905 12.7026 9.83903C13.2205 10.589 13.4984 11.4786 13.4996 12.3899V13.4999H11.9996" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Collaborators
                            </div>
                            <div className='text-[#405D80] font-bold'>
                                <Collaborators project={project} editable={editable} roles={roles} />
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="px-[16px]">
                    <h3 className="font-Eina03 font-bold text-[14px] text-[#222] mb-2">Notes (Quick Summary)</h3>
                    <Textarea value={project.description} className="resize-none" onChange={() =>{}} />
                </Card>

                <RequestChangePopUp
                    roles={roles}  
                    project={project}
                    members={project?.team?.members || []}
                    open={showRequestToChangePopUp}
                    onChange={handleChangeRole}
                    onClose={() => setShowRequestToChangePopUp(false)} />

                <ServerError 
                    open={popup.server_error.visible} 
                    title="Error"
                    message={popup.server_error.message}
                    onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
                />

                <ServerSuccess
                    open={popup.server_success.visible} 
                    title="Success"
                    message={popup.server_success.message}
                    onClose={() => {setPopup({...popup, server_success: { visible: false }})}}  
                />
        </div>
    );
}