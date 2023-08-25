import { useState } from "react";
import ProjectDetailsStepper from "./project-details-stepper";
import ProjectStatus from "./project-status";
import { getRoleFromProjectBySlug } from '@/utils/helpers'
export default function ProjectDetailsHeader({ project, steps = [], activeStep = null, roles }) {
    const [toggle, setToggle] = useState(true)
    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div className='bg-[#01388A] rounded-[6px] mb-3 flex flex-col'>
            <div className="p-[16px] flex">
                <div>
                    <h1 className='text-white text-[24px] font-bold mb-2'>{project.name}</h1>
                    <div className='text-[#B8C2CC] text-[12px]'>
                        Created by { project.created_at }
                        {
                            roles.length && project.team && project.team.members ? 
                            <span className='inline-block border rounded-full border-full px-2 py-1 ml-2'>Owner : { getRoleFromProjectBySlug(project, 'lead', roles) }</span>
                            : <></>
                        }
                    </div>
                </div>
                <div className='ml-auto inline-flex items-start'>
                    <ProjectStatus type={project.status ? project.status.toLowerCase().replace(/\s*/g, '') : ''}>{project.status}</ProjectStatus>
                    <span href="#" className="ml-3">
                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7134 20.2858C15.8418 20.2858 19.9992 16.1284 19.9992 11.0001C19.9992 5.87171 15.8418 1.71436 10.7134 1.71436C5.58509 1.71436 1.42773 5.87171 1.42773 11.0001C1.42773 16.1284 5.58509 20.2858 10.7134 20.2858Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.7129 11V16" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.7143 8.14293C11.1088 8.14293 11.4286 7.82313 11.4286 7.42864C11.4286 7.03415 11.1088 6.71436 10.7143 6.71436C10.3198 6.71436 10 7.03415 10 7.42864C10 7.82313 10.3198 8.14293 10.7143 8.14293Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                </div>
            </div>
            <div className="bg-[#012D55] w-full relative  rounded-b-[6px]">
                {
                    steps.length ?
                    (
                        <a 
                                onClick={handleToggle}
                                href="#" 
                                className="absolute top-[-23px] right-[15px] bg-[#012D55] px-[15px] py-[5px] rounded-t-[6px]">
                                <svg className={`${toggle ? 'rotate-180': ''}`} width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 6.80756L6.67692 1.13986C6.71836 1.09571 6.76841 1.06052 6.82397 1.03647C6.87954 1.01241 6.93945 1 7 1C7.06055 1 7.12046 1.01241 7.17603 1.03647C7.23159 1.06052 7.28164 1.09571 7.32308 1.13986L13 6.80756" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1 11.617L6.67692 5.94004C6.7632 5.85547 6.87919 5.80811 7 5.80811C7.12081 5.80811 7.2368 5.85547 7.32308 5.94004L13 11.617" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                    ): <></>
                }
                
                {
                    steps.length && toggle ? (
                        <div className="p-[16px]">
                            <ProjectDetailsStepper steps={steps} active={activeStep} />
                        </div>
                    ) : <></>
                }
            </div>
        </div>
    );
}