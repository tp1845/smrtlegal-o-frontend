'use client'

import { useEffect, useState } from "react"
import Tabs from "@/components/tabs";
import ProjectContext from '@/context/project';
import * as api from '@/api'
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/dashboard";
import ProjectDetailsHeader from "@/components/project-details-header";
import moment from 'moment'
import { getRoleFromProjectBySlug } from "@/utils/helpers";
import Button from "@/components/button";
import downloaddocument from '@/assets/download-document.svg'
import { getAbsolutePathToDocument } from '@/utils/helpers'

export default function ArchivedProjectLayout({ children }) {
    const { push } = useRouter();
    const [roles, setRoles] = useState([]);
    const [project, setProject] = useState({});
    const [tabs, setTabs] = useState([
        {
            label: 'General',
            slug: '',
        },
        {
            label: 'History',
            slug: 'history',
        },
    ])

    const [activeTab, setActiveTab] = useState(tabs[0])

    const handleChangeTab = (tab) => {
        if (project?.id) {
            setActiveTab(tab)
            push('/archived-projects/' + project.id + '/' + tab.slug)
        }
    }

    useEffect(() => {
        const [host, page, id, tab] = location.pathname.split('/')
        api
            .get_project(id)
            .then(({ data }) => {
                setProject({
                    ...project,
                    id: data.id,
                    name: data.name,
                    doctype: data.document.type,
                    updated_at: moment(data.updated_at).format('ll'),
                    created_at: moment(data.created_at).format('ll'),
                    due_date: moment(data.due_date).format("ll"),
                    status: data.status,
                    lead: getRoleFromProjectBySlug(project, 'lead', roles),
                    owner: getRoleFromProjectBySlug(project, 'owner', roles),
                    description: data.summary ?? '',
                    team: data.team,
                    document: data.document,
                })
            })

        api.roles()
            .then(data => data.json())
            .then((data) => {
                if (data && data.data) {
                    setRoles(data.data)
                }
            })

        const currentTab = tabs.find(t => t.slug == tab)
        if (currentTab) {
            setActiveTab(currentTab)
        } else {
            setActiveTab(tabs[0])
        }
    }, []);

    const handleBack = () => {
        push('/archived-projects')
    }

    const handleButton = () => {
        const path = getAbsolutePathToDocument(project.document?.path);

        const a = document.createElement('a')
        a.href = path
        a.download = path
        a.target = "_blank"
        a.click()
    }

    return (
        <DashboardLayout>
            <div className="lg:pl-[280px] pl-0 pt-[90px] pr-[20px]">
                <a href="#" onClick={(e) => { e.preventDefault(); handleBack(); }} className="flex text-[12px] items-center mb-3 font-bold">
                    <svg className="mr-2" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 5H0.5" stroke="#222222" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 1.5L0.5 5L4 8.5" stroke="#222222" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to list
                </a>
                <ProjectDetailsHeader
                    project={project}
                    roles={roles}
                />
                <ProjectContext.Provider value={{ project, roles, setProject }}>
                    <div className="flex justify-between items-center">
                        <Tabs tabs={tabs} active={activeTab} className="mb-8" change={handleChangeTab} />
                        <Button onClick={handleButton} icon={downloaddocument} className="!text-[#1860CC] !px-5 !py-2 !text-[14px] border border-[#1860CC]" label="Download" />
                    </div>
                    {children}
                </ProjectContext.Provider>
            </div>
        </DashboardLayout>);
}