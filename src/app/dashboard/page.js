'use client'
import Button from "@/components/button";
import Card from "@/components/card";
import DashboardOverview from "@/components/dashboard-overview";
import IconNewProjectBtnSVG from "@/assets/new-project-btn.svg"
import IconSortBySVG from "@/assets/sort-by.svg"
import ActiveProjectCard from "@/components/active-project-card";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import Select from "@/components/select";
import { useRouter } from "next/navigation";
import SortBy from "@/components/sort-by";
import * as api from '@/api'
import moment from 'moment'
import { getRandomColor } from "@/utils/helpers"
import { useUser } from "@/context/user";

export default function Dashboard() {
    const [view, setView] = useState('cards');
    const { push } = useRouter();

    const { user } = useUser();

    const [statistics, getStatistics] = useState({
        'on-going': 10,
        'pending': 32,
        'complete': 12,
    });

    useEffect(() => {
        api
            .statistics()
            .then((data) => {
                getStatistics(data)
            })

        getProjects();
    }, []);

    const [projects, setProjects] = useState([])

    const options = [
        {
            label: 'General',
            value: ' ',
        },
        {
            label: 'Full view',
            value: 'full-view',
        },
        {
            label: 'Summary',
            value: 'summary',
        },
        {
            label: 'Forum',
            value: 'forum',
        },
        {
            label: 'History',
            value: 'history',
        }
    ]

    const getProjects = (filter = {}) => {
        api
            .projects(filter)
            .then(({ data }) => {
                setProjects([
                    ...data.map(row => {
                        return {
                            ...row,
                            color: getRandomColor(),
                            due_date: moment(row.due_date).format('ll'),
                            updated_at: moment(row.updated_at).format('ll')
                        }
                    }),
                ])
            })
    }

    const handleSelectOption = (option, project) => {
        push('/active-projects/' + project.id + '/' + option.value)
    }

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

    const handleChangeFilter = (filter) => {
        getProjects({
            sortBy: filter.name,
            sortValue: filter.value,
        });
    }

    const getOwner = (team) => {
        const members = team && team.members || []
        const [lead] = members
        return (lead && lead.fname + ' ' + lead.lname) || lead && lead?.email
    }

    let period = 'now';
    const today = new Date()
    const curHr = today.getHours()

    if (curHr < 12) {
        period = "morning";
    } else if (curHr < 18) {
        period = "afternoon";
    } else {
        period = "evening";
    }

    return (<div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
        <h3 className="font-Eina03 text-[#212936] text-[24px] font-bold mb-4">Good {period}, {user.fname ? user.fname : (user.name ? user.name : user.email)}</h3>

        <div className="grid grid-cols-2 pb-[20px]">
            <div className="text-[14px]">
                <div className="pt-[20px] text-[#777E86] font-bold pb-[10px]">Today&apos;s Tasks:</div>
                <div className="pb-[10px]"><span className="text-[#777E86]">To sign:</span> <a href="#" className="text-[#3265E2] underline">Zephyr & Virgin Galactic</a> <a className="text-[#3265E2] underline" href="#">Virgin</a></div>
                <div className="pb-[10px]"><span className="text-[#777E86]">To sign:</span> <a className="text-[#3265E2] underline" href="#">Zephyr & Virgin Galactic</a> <a className="text-[#3265E2] underline" href="#">Virgin</a></div>
            </div>

            <div className="grid grid-cols-3 divide-x font-bold">
                <div className="px-[20px]">
                    <div className="text-[40px] text-[212936]">{statistics['on-going']}</div>
                    <div className="text-[14px] text-[#777E86]">On-going projects</div>
                </div>
                <div className="px-[20px]">
                    <div className="text-[40px] text-[212936]">{statistics['pending']}</div>
                    <div className="text-[14px] text-[#777E86]">Pending review requests</div>
                </div>
                <div className="px-[20px]">
                    <div className="text-[40px] text-[212936]">{statistics['complete']}</div>
                    <div className="text-[14px] text-[#777E86]">Complete projects</div>
                </div>
            </div>
        </div>

        <Card>
            <div className="flex items-center mb-4">
                <h3 className="font-Eina03 text-[#222] text-[20px] font-bold">Active Projects</h3>
                <div className="flex ml-auto items-center">
                    <div className="mr-2">
                        <Button
                            label="New project"
                            icon={IconNewProjectBtnSVG}
                            className="px-4 py-1 text-[12px] bg-[#1860CC]"
                            onClick={() => push('/new-project')}
                        />
                    </div>
                    <div className="mr-2">
                        <SortBy onChange={handleChangeFilter} />
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('cards') }} className="ml-3 inline-block">
                        <svg stroke={view == 'cards' ? '#4BA3F5' : '#B8C2CC'} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.15385 1H2.53846C1.68879 1 1 1.68879 1 2.53846V7.15385C1 8.00352 1.68879 8.69231 2.53846 8.69231H7.15385C8.00352 8.69231 8.69231 8.00352 8.69231 7.15385V2.53846C8.69231 1.68879 8.00352 1 7.15385 1Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19.4624 1H14.8471C13.9974 1 13.3086 1.68879 13.3086 2.53846V7.15385C13.3086 8.00352 13.9974 8.69231 14.8471 8.69231H19.4624C20.3121 8.69231 21.0009 8.00352 21.0009 7.15385V2.53846C21.0009 1.68879 20.3121 1 19.4624 1Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.15385 13.3079H2.53846C1.68879 13.3079 1 13.9967 1 14.8463V19.4617C1 20.3114 1.68879 21.0002 2.53846 21.0002H7.15385C8.00352 21.0002 8.69231 20.3114 8.69231 19.4617V14.8463C8.69231 13.9967 8.00352 13.3079 7.15385 13.3079Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19.4624 13.3079H14.8471C13.9974 13.3079 13.3086 13.9967 13.3086 14.8463V19.4617C13.3086 20.3114 13.9974 21.0002 14.8471 21.0002H19.4624C20.3121 21.0002 21.0009 20.3114 21.0009 19.4617V14.8463C21.0009 13.9967 20.3121 13.3079 19.4624 13.3079Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setView('lists') }} className="ml-3 inline-block">
                        <svg stroke={view == 'lists' ? '#4BA3F5' : '#B8C2CC'} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76923 2.84608C2.19407 2.84608 2.53846 2.50168 2.53846 2.07685C2.53846 1.65201 2.19407 1.30762 1.76923 1.30762C1.3444 1.30762 1 1.65201 1 2.07685C1 2.50168 1.3444 2.84608 1.76923 2.84608Z" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.1543 2.07666H21.0004" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.76923 9.76917C2.19407 9.76917 2.53846 9.42478 2.53846 8.99994C2.53846 8.57511 2.19407 8.23071 1.76923 8.23071C1.3444 8.23071 1 8.57511 1 8.99994C1 9.42478 1.3444 9.76917 1.76923 9.76917Z" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.1543 8.99976H21.0004" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.76923 16.6923C2.19407 16.6923 2.53846 16.3479 2.53846 15.923C2.53846 15.4982 2.19407 15.1538 1.76923 15.1538C1.3444 15.1538 1 15.4982 1 15.923C1 16.3479 1.3444 16.6923 1.76923 16.6923Z" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.1543 15.9229H21.0004" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
            {
                view == 'cards' ? (
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-5">
                        {
                            projects.map((project, index) => {
                                return (
                                    <div key={index}>
                                        <ActiveProjectCard project={project} options={options} />
                                    </div>
                                );
                            })
                        }
                    </div>
                ) : (
                    <div>
                        <div className="w-full font-Eina03">
                            <div className="grid grid-cols-[250px_1fr_1fr_1fr_1fr] mb-2 gap-4 border-y border-y-1 bg-[#FAFAFA] px-2 text-[12px] text-[#B8C2CC]">
                                <div className="py-2 w-[25%]"></div>
                                <div className="py-2">
                                    <div className="flex items-center">
                                        <svg className="mr-2" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_101_11607)">
                                                <path d="M1.5 2.62329C1.23478 2.62329 0.98043 2.72865 0.792893 2.91618C0.605357 3.10372 0.5 3.35807 0.5 3.62329V12.6233C0.5 12.8885 0.605357 13.1429 0.792893 13.3304C0.98043 13.5179 1.23478 13.6233 1.5 13.6233H12.5C12.7652 13.6233 13.0196 13.5179 13.2071 13.3304C13.3946 13.1429 13.5 12.8885 13.5 12.6233V3.62329C13.5 3.35807 13.3946 3.10372 13.2071 2.91618C13.0196 2.72865 12.7652 2.62329 12.5 2.62329H10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M0.5 6.62329H13.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.5 0.623291V4.62329" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.5 0.623291V4.62329" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.5 2.62329H8.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_101_11607">
                                                    <rect width="14" height="14" fill="white" transform="translate(0 0.123291)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Date
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="flex items-center">
                                        <svg className="mr-2" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_101_11618)">
                                                <path d="M9.5 1.62329H11C11.2652 1.62329 11.5196 1.72865 11.7071 1.91618C11.8946 2.10372 12 2.35807 12 2.62329V12.6233C12 12.8885 11.8946 13.1429 11.7071 13.3304C11.5196 13.5179 11.2652 13.6233 11 13.6233H3C2.73478 13.6233 2.48043 13.5179 2.29289 13.3304C2.10536 13.1429 2 12.8885 2 12.6233V2.62329C2 2.35807 2.10536 2.10372 2.29289 1.91618C2.48043 1.72865 2.73478 1.62329 3 1.62329H4.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.5 0.623291H5.5C4.94772 0.623291 4.5 1.07101 4.5 1.62329V2.12329C4.5 2.67558 4.94772 3.12329 5.5 3.12329H8.5C9.05228 3.12329 9.5 2.67558 9.5 2.12329V1.62329C9.5 1.07101 9.05228 0.623291 8.5 0.623291Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.5 5.62329H9.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.5 8.12329H9.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.5 10.6233H9.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_101_11618">
                                                    <rect width="14" height="14" fill="white" transform="translate(0 0.123291)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Doc Type
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="flex items-center">
                                        <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.00105 8.04629C8.27555 8.04629 9.30874 7.0131 9.30874 5.7386C9.30874 4.4641 8.27555 3.43091 7.00105 3.43091C5.72655 3.43091 4.69336 4.4641 4.69336 5.7386C4.69336 7.0131 5.72655 8.04629 7.00105 8.04629Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3.05859 11.6463C3.47051 10.9701 4.04943 10.4113 4.73971 10.0236C5.42998 9.6358 6.2084 9.43213 7.00013 9.43213C7.79186 9.43213 8.57028 9.6358 9.26056 10.0236C9.95083 10.4113 10.5298 10.9701 10.9417 11.6463" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 13.1233C10.3137 13.1233 13 10.437 13 7.12329C13 3.80958 10.3137 1.12329 7 1.12329C3.68629 1.12329 1 3.80958 1 7.12329C1 10.437 3.68629 13.1233 7 13.1233Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Owner
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="flex items-center">
                                        <svg className="mr-2" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5 10.6233V12.6233C13.5 12.8885 13.3946 13.1429 13.2071 13.3304C13.0196 13.5179 12.7652 13.6233 12.5 13.6233H10.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.5 0.623291H12.5C12.7652 0.623291 13.0196 0.728648 13.2071 0.916184C13.3946 1.10372 13.5 1.35807 13.5 1.62329V3.62329" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M0.5 3.62329V1.62329C0.5 1.35807 0.605357 1.10372 0.792893 0.916184C0.98043 0.728648 1.23478 0.623291 1.5 0.623291H3.5" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3.5 13.6233H1.5C1.23478 13.6233 0.98043 13.5179 0.792893 13.3304C0.605357 13.1429 0.5 12.8885 0.5 12.6233V10.6233" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 6.62329C8.10457 6.62329 9 5.72786 9 4.62329C9 3.51872 8.10457 2.62329 7 2.62329C5.89543 2.62329 5 3.51872 5 4.62329C5 5.72786 5.89543 6.62329 7 6.62329Z" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.1598 10.6234C9.87547 10.0262 9.4277 9.52184 8.86843 9.16872C8.30916 8.81559 7.66127 8.62817 6.99984 8.62817C6.33842 8.62817 5.69053 8.81559 5.13126 9.16872C4.57198 9.52184 4.12422 10.0262 3.83984 10.6234" stroke="#B8C2CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Team
                                    </div>
                                </div>
                            </div>
                            {
                                !projects.length ? (
                                    <div className="text-[14px] text-center w-full">Records not found.</div>
                                ) : <></>
                            }
                            {
                                projects.map((project, index) => {
                                    return (
                                        <div key={index} className="hover:shadow-[0px_6px_6px_rgba(0,0,0,0.25),-6px_6px_6px_#D3E4FE] grid grid-cols-[250px_1fr_1fr_1fr_1fr] mb-2 items-center gap-3 hover:border-[rgba(0,0,0,.5)] border-[transparent] border shadow-[0px_2px_2px_rgba(211,228,254,0.8)] rounded-[6px] cursor-pointer">
                                            <div className="text-[12px] text-[#222] font-bold py-3 pl-3 flex items-center">
                                                <span style={{ backgroundColor: '#' + project.color }} className={`w-[15px] h-[15px] rounded-full flex mr-2`}></span>
                                                {project.name}
                                            </div>
                                            <div className="text-[12px] text-[#222] font-normal">
                                                {project.due_date}
                                            </div>
                                            <div className="text-[12px] text-[#36475E] font-normal">
                                                {project?.document?.type}
                                            </div>
                                            <div className="text-[12px] text-[#36475E] font-normal">
                                                {getOwner(project.team)}
                                            </div>
                                            <div className="text-[12px] text-[#36475E] font-normal">
                                                <div className="flex items-center w-full ">
                                                    <div className="mr-2"></div>
                                                    <Select
                                                        options={options}
                                                        icon={optionIcon}
                                                        onSelect={(option) => handleSelectOption(option, project)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </Card>
    </div>);
}