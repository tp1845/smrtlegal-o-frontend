'use client'

import Dropdown from "@/components/dropdown";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import * as api from '@/api'
import Button from "@/components/button";
import moment from "moment";
import { useRouter } from "next/navigation";
export default function ArchivedProjects() {
    const { push } = useRouter();

    const fields = [
        {
            label: "Project name",
            field: 'name',
            sort: 'asc',
            class: 'font-bold'
        },
        {
            label: "Doc Type",
            field: 'type',
            sort: 'asc',
            class: 'font-bold'
        },
        {
            label: "Last Modified",
            field: 'updated_at',
            sort: 'asc'
        },
        {
            label: "Team",
            field: 'team',
            sort: 'asc'
        },
        {
            label: "No. of versions",
            field: 'versions',
            sort: 'asc'
        }
    ];
    const [roles] = useState([
        {
            label: 'Sort by Owner',
            value: ''
        },
        {
            label: 'Owner by A-Z',
            value: 'a-z'
        },
        {
            label: 'Owner by Z-A',
            value: 'z-a'
        }
    ]);
    const [teams, setTeams] = useState([]);
    const [archivedProjects, setArchivedProjects] = useState(null);
    const [sorts] = useState([
        {
            label: 'Sort by date',
            value: '',
        },
        {
            label: 'Newest first',
            value: 'newest-first',
        },
        {
            label: 'Oldest first',
            value: 'oldest-first',
        },
    ]);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [filter, setFilter] = useState({
        team_id: {
            label: 'Select Team',
            value: '',
        },
        document_id: [
            {
                label: "Document type",
                value: '',
            }
        ],
        owner:   {
            label: 'Sort by owner',
            value: '',
        },
        date:   {
            label: 'Sort by date',
            value: '',
        },
    });

    const getProjects = (filter) => {

        const props = {
            'team_id': filter.team_id ? filter.team_id.value : '',
            'document_id': filter.document_id ? filter.document_id.map(item => item.value).join(',') : '',
            'owner': filter?.owner?.value,
            'date': filter?.date?.value,
        };

        api.get_archived_projects(props)
            .then(({ data }) => {
                data = data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        type: item.document?.type,
                        updated_at: moment(item.updated_at).format('ll'),
                        team: item.team?.name,
                        versions: item.version,
                    }
                })
                setArchivedProjects(data);
            });
    }

    const handleClickReset = () => {
        const clearFilter = {
            team_id: {
                label: 'Select Team',
                value: '',
            },
            document_id: [
                {
                    label: "Document type",
                    value: '',
                }
            ],owner:   {
                label: 'Sort by owner',
                value: '',
            },
            date:   {
                label: 'Sort by date',
                value: '',
            },
        }

        setFilter(clearFilter)
        getProjects(clearFilter);
    }

    const handleChangeFilter = (filter) => {
        getProjects(filter);
    }

    const handleClickRow = (row) => {
        push('/archived-projects/' + row.id)
    }


    useEffect(() => {
        api.get_profile_teams()
        .then(data => data.json())
        .then((data) => {
           if (data && data.data && data.data.length) {
            const teams = [
                {
                    label: "Select Team",
                    value: '',
                },
                ...data.data.map(role => ({label : role.name, value: role.id}) )
            ]
            setTeams(teams)
            setFilter({...filter, team_id: teams[0]})
           }
        });

        api.get_document_types()
        .then(({ data }) => {
            data = data.map(item => ({label: item.name, value: item.id}))
            setDocumentTypes([
                {
                    label: "Document type",
                    value: '',
                },
                ...data
            ]);
        })

        getProjects(filter);
    }, [])

    return (<div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
         <div className="flex items-center items-center content-center py-[22px]">
            <div className=" mr-[12px]">
                <Button 
                    label="All results"
                    className="bg-[#4ECFE0] text-[14px] min-w-[100px]"
                    onClick={handleClickReset}
                />
            </div>
            <div className="mr-[12px]">
                <Dropdown 
                    options={roles}
                    value={filter.owner}
                    type="radio"
                    name="name"
                    onSelect={(option) => { setFilter({...filter, date: {label: 'Sort by Date', value: ''}, owner: option });  handleChangeFilter({...filter, date: {label: 'Sort by Date', value: ''}, owner: option })}}
                />
            </div>
            <div 
                className="mr-[12px]">
                <Dropdown
                    options={teams}
                    value={filter.team_id}
                    type="radio"
                    name="team"
                    className="max-w-[150px]"
                    onSelect={(option) => {  setFilter({...filter, team_id: option}); handleChangeFilter({...filter, team_id: option})}}
                />
            </div>
            <div
                className="mr-[12px]"
            >
                <Dropdown 
                    options={sorts}
                    value={filter.date}
                    type="radio"
                    name="created_at"
                    className="max-w-[200px]  mr-[12px]"
                    onSelect={(option) => { setFilter({...filter, owner: {label: 'Sort by Owner', value: ''}, date: option });  handleChangeFilter({...filter, owner: {label: 'Sort by Owner', value: ''}, date: option })}}
                />
            </div>
            <div
                className="mr-[12px]"
                >
                <Dropdown 
                    options={documentTypes}
                    value={filter.document_id}
                    type="checkbox"
                    className="max-w-[200px]"
                    onSelect={(options) => { setFilter({...filter, document_id: options});  handleChangeFilter({...filter, document_id: options})}}
                />
            </div>
        </div>
        <Table fields={fields} data={archivedProjects} onClickRow={handleClickRow} />
    </div>);
}