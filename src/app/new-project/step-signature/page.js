'use client'
import Button from '@/components/button';
import Input from '@/components/input';
import UploadDocument from '@/popups/upload-document'
import { useState } from 'react';
import { useNewProject } from '@/context/new-project'
import { useRouter } from 'next/navigation'
import MemberAdd from '@/components/member-add';
import Select from '@/components/select';


export default function StepThree() {
    const {project, setProject, handleNext} = useNewProject();
    const [require_approvals, setRequireApprovals] = useState(true);

    const handleChangeRequireApprovals = (toggle) => {
        setRequireApprovals(toggle)
    }

    const handleApprovers = (members) => {
        setProject({
            ...project,
            approvers: [...members]
        })
    }

    const getApproversOptions = () => {
        const items = project.approvers.map(approver => {
            return {
                label: approver.name,
                value: approver.email
            }
        })

        return [
            {
                label: 'Not selected',
                value: null,
            }, ...items];
    }

    const handleSelectFinalApprover = (approver) => {
        setProject({
            ...project,
            final_approver: approver
        })
    }
    
    return (<div>
                <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">{/*Approvals & */} Signatures</h3>
                {/* <p className="font-Eina03 font-bold text-[14px] text-[#222] flex">
                    Does your project require approvals before sending it to a third party?
                    <svg className='ml-[5px]' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2857 19.5714C15.4141 19.5714 19.5714 15.4141 19.5714 10.2857C19.5714 5.15736 15.4141 1 10.2857 1C5.15736 1 1 5.15736 1 10.2857C1 15.4141 5.15736 19.5714 10.2857 19.5714Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2861 10.2856V15.2856" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2856 7.42857C10.6801 7.42857 10.9999 7.10877 10.9999 6.71429C10.9999 6.3198 10.6801 6 10.2856 6C9.89109 6 9.57129 6.3198 9.57129 6.71429C9.57129 7.10877 9.89109 7.42857 10.2856 7.42857Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
                <div className="flex items-center pt-[17px]">
                    <label className={`mr-[24px] font-Eina03 text-[#171717] flex items-center text-[14px] cursor-pointer`} onClick={() => handleChangeRequireApprovals(true)}>
                        <div className={`w-[18px] h-[18px] ${require_approvals == true ? 'bg-[#4ECFE0]' : 'border-2 border-[#D4D4D4]'} rounded-[3px] text-white flex items-center justify-center`}>
                            {
                                require_approvals ? (
                                    <span>
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7851 1.31402C10.9568 1.47146 10.9684 1.73832 10.811 1.91007L4.62349 8.66007C4.54573 8.7449 4.43671 8.79428 4.32166 8.79678C4.20662 8.79928 4.09555 8.75468 4.01419 8.67331L1.20169 5.86081C1.03694 5.69606 1.03694 5.42894 1.20169 5.26419C1.36644 5.09944 1.63356 5.09944 1.79831 5.26419L4.29925 7.76513L10.189 1.33993C10.3465 1.16818 10.6133 1.15658 10.7851 1.31402Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                ) : <></>
                            }
                        </div>
                        <span className='ml-[6px]'>Yes</span>
                    </label>
                    <label className={`font-Eina03 text-[#171717] flex items-center text-[14px] cursor-pointer`} onClick={() => handleChangeRequireApprovals(false)}>
                        <div className={`w-[18px] h-[18px] ${require_approvals == false ? 'bg-[#4ECFE0]' : 'border-2 border-[#D4D4D4]'} rounded-[3px] text-white flex items-center justify-center`}>
                            {
                                ! require_approvals ? (
                                    <span>
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7851 1.31402C10.9568 1.47146 10.9684 1.73832 10.811 1.91007L4.62349 8.66007C4.54573 8.7449 4.43671 8.79428 4.32166 8.79678C4.20662 8.79928 4.09555 8.75468 4.01419 8.67331L1.20169 5.86081C1.03694 5.69606 1.03694 5.42894 1.20169 5.26419C1.36644 5.09944 1.63356 5.09944 1.79831 5.26419L4.29925 7.76513L10.189 1.33993C10.3465 1.16818 10.6133 1.15658 10.7851 1.31402Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                ) : <></>
                            }
                        </div>
                        <span className='ml-[6px]'>No</span>
                    </label>
                </div> */}
                {
                    require_approvals ? (
                        <>
                            {/* <MemberAdd label="Add Approvers" 
                                value={project.approvers} 
                                onUpdate={handleApprovers} 
                                roles={[]}
                            /> */}
                            <h3 className='font-Eina03 font-bold text-[14px] text-[#222] mt-[56px] mb-[24px] flex items-center'>Who will sign the final document?</h3>
                            <div>
                                <Select 
                                    options={getApproversOptions()}
                                    value={project.final_approver}
                                    onSelect={handleSelectFinalApprover}
                                />
                            </div>
                        </>
                    ) : <></>
                }
                
                <div>
                    <label className="font-Eina03 text-[12px] text-[#222] flex items-center">
                        <div className={`w-[18px] h-[18px] ${project.save_for_future != false ? 'bg-[#4ECFE0]' : 'border-2 border-[#D4D4D4]'} rounded-[3px] text-white flex items-center justify-center`}>
                            {
                                project.save_for_future ? (
                                    <span>
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7851 1.31402C10.9568 1.47146 10.9684 1.73832 10.811 1.91007L4.62349 8.66007C4.54573 8.7449 4.43671 8.79428 4.32166 8.79678C4.20662 8.79928 4.09555 8.75468 4.01419 8.67331L1.20169 5.86081C1.03694 5.69606 1.03694 5.42894 1.20169 5.26419C1.36644 5.09944 1.63356 5.09944 1.79831 5.26419L4.29925 7.76513L10.189 1.33993C10.3465 1.16818 10.6133 1.15658 10.7851 1.31402Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                ) : <></>
                            }
                        </div>
                        <span className="px-[12px] py-[26px] cursor-pointer" onClick={() => setProject({...project, save_for_future: ! project.save_for_future})}>
                            Save {/*<strong>Approvers</strong> and */}<strong>Signatories</strong> for this team for future projects
                        </span>
                    </label>
                </div>
                <Button  label="Skip and later" onClick={() => handleNext()} className="bg-[#1860CC] !text-white font-bold !w-full text-[14px] px-[20px]" />
            </div>
    );
}