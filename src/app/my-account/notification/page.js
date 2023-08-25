'use client'
import Card from "@/components/card";
import Tabs from "@/components/tabs";
import Image  from "next/image";
import infosvg from "@/assets/info.svg"
import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation'
import Accordion from '@/components/accordion'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';

import * as api from '@/api';

export default function Notification () {
    const { push } = useRouter();

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

    const tabs = [
        {
            label: "Profile",
            slug: "",
        },
        {
            label: "Notification",
            slug: "notification",
        },
        {
            label: "Teams",
            slug: "teams",
        }
    ];

    useEffect(() => {
        api.get_settings()
            .then(data => data.json())
                .then(({ data }) => {
                    if (data) {
                        setTasks([
                        {   
                            label: 'Assignee changes',
                            value: !!data.assignee_changes,
                            slug: 'assignee_changes'
                        },
                        {
                            label: 'Status changes',
                            value: !!data.status_cahnges,
                            slug: 'status_cahnges'
                        },
                        {
                            label: 'Tasks assigned to me',
                            value: !!data.tasks_assigned_to_me,
                            slug: 'tasks_assigned_to_me'
                        },
                        {
                            label: 'Document edited',
                            value: !!data.document_edited,
                            slug: 'document_edited'
                        },
                        {
                            label: 'New version published',
                            value: !!data.new_version_published,
                            slug: 'new_version_published'
                        }
                        ])
        
                        setDueDates([
                            {
                                label: 'Due date changes',
                                value: !!data.due_date_changes,
                                slug: 'due_date_changes'
                            },
                            {
                                label: 'Due date overdue',
                                value: !!data.due_date_overdue,
                                slug: 'due_date_overdue'
                            },
                            {
                                label: 'Before due date reminder',
                                value: !!data.before_due_date_reminder,
                                slug: 'before_due_date_reminder'
                            },
                        ])
                    } else {
                        setTasks([
                            {
                                label: 'Assignee changes',
                                value: false,
                                slug: 'assignee_changes'
                            },
                            {
                                label: 'Status changes',
                                value: false,
                                slug: 'status_cahnges'
                            },
                            {
                                label: 'Tasks assigned to me',
                                value: false,
                                slug: 'tasks_assigned_to_me'
                            },
                            {
                                label: 'Document edited',
                                value: false,
                                slug: 'document_edited'
                            },
                            {
                                label: 'New version published',
                                value: false,
                                slug: 'new_version_published'
                            },
                        ])

                        setDueDates([
                            {
                                label: 'Due date changes',
                                value: false,
                                slug: 'due_date_changes'
                            },
                            {
                                label: 'Due date overdue',
                                value: false,
                                slug: 'due_date_overdue'
                            },
                            {
                                label: 'Before due date reminder',
                                value: false,
                                slug: 'before_due_date_reminder'
                            },
                        ])
                    }
            })
    }, [])

    const [active, setActive] = useState(tabs[1])

    const changeTab = (tab) => {
        push("/my-account/" + tab.slug)
    }

    const [comments, setComments] = useState([])
    const [tasks, setTasks] = useState([])
    const [duedates, setDueDates] = useState([]);

    const updateSettings = (option) => {
        api.update_settings({
            setting: option.slug,
            value: ! option.value
        }).then(data => {
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
        })
    }

    const handleChangeComments = (option) => {
        setComments([
            ...comments.map(row => {
                if (row.label == option.label) {
                    return {
                        label: row.label,
                        value: ! option.value,
                        slug: row.slug
                    }
                }
                return row
            })
        ])
        updateSettings(option);
    }
    
    
    const handleChangeTasks = (option) => {
        setTasks([
            ...tasks.map(row => {
                if (row.label == option.label) {
                    return {
                        label: row.label,
                        value: ! option.value,
                        slug: row.slug
                    }
                }
                return row
            })
        ]);
        updateSettings(option);
    }

    const handleChangeDueDates = (option) => {
        setDueDates([
            ...duedates.map(row => {
                if (row.label == option.label) {
                    return {
                        label: row.label,
                        value: ! option.value,
                        slug: row.slug
                    }
                }
                return row
            })
        ]);
        updateSettings(option);
    }

    return (<div className="p-4 lg:pl-[270px] pl-0 pt-[90px]">
                <Tabs tabs={tabs} active={active} change={changeTab} />
                <div className="pt-[30px]">
                    <Card>
                        <div className="text-[14px] flex items-center mb-[15px] font-Eina03">
                            <Image 
                                src={infosvg} 
                                width="18"
                                heigh="18"
                                alt="image" 
                                className="mr-3"
                            />
                            <p>Notification settings can be customized for each Workspace you&apos;re part of</p>
                        </div>
                        <div className="text-[14px]  flex items-center font-Eina03">
                            <Image 
                                src={infosvg} 
                                width="18"
                                heigh="18"
                                alt="image" 
                                className="mr-3"
                            />
                            By default, you&apos;ll receive notifications for tasks that you&apos;re a viewer on.
                        </div>
                    </Card>
                    <div className="mb-[20px]"></div>
                    <Card>
                        <Accordion label="Comments" items={comments} handleChange={handleChangeComments} />
                    </Card>
                    <div className="mb-[20px]"></div>
                    <Card>
                        <Accordion label="Tasks" items={tasks} handleChange={handleChangeTasks} />
                    </Card>
                    <div className="mb-[20px]"></div>
                    <Card>
                        <Accordion label="Due dates" items={duedates} handleChange={handleChangeDueDates} />
                    </Card>
                </div>
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