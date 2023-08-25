'use client'
import Table from "@/components/table";
import { useEffect, useState } from "react";
import * as api from '@/api'
import ProjectStatus from "@/components/project-status";
import { useRouter } from "next/navigation";
import moment from 'moment'
import { Alert } from 'antd';

export default function ActiveProject() {
    const { push } = useRouter();
    

    const [fields, setFields] = useState([
        {
            label: 'Project name',
            field: 'name',
        },
        {
            label: 'Doc Type',
            getValue: (row) => {
                return row['document'] && row['document'] && row['document']['type'] || '';
            }
        },
        {
            label: 'Last modified',
            field: 'updated_at',
        },
        {
            label: 'Due Date',
            field: 'due_date',
        },
        {
            label: 'Status',
            getValue: (row) => {
                return (
                    <ProjectStatus id={row.id} type={row.status.toLowerCase().replace(/\s*/g, '')}/>
                );
            }
        },
        // {
        //     label: 'Lead',
        //     getValue: (row) => {
        //         // const members = row['team'] && row['team']['members'] || []
        //         // const [lead] = members;
        //         const leads = [];
        //         row['leads'].forEach(lead => {
        //             if (lead.email) {
        //                 leads.push(lead.fname ? lead.fname + ' ' + lead.lname : lead.email);
        //             }
        //         });

        //         return leads.join(',');
        //     }
        // }
    ]);

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        api
            .projects()
            .then(({ data }) => {
                setProjects([
                    ...data?.map(row => {
                        return {
                            ...row,
                            due_date: moment(row.due_date).format('ll'),
                            updated_at: moment(row.updated_at).format('ll')
                        }
                    }),
                ])
            })
    }, []);

    const handleClickRow = (row) => {
        push('/active-projects/' + row.id)
    }

    return (
        <div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
            <Table
                fields={fields}
                data={projects}
                onClickRow={handleClickRow}
            />
        </div>);
}