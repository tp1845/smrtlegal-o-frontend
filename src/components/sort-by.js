'use client'
import { useEffect, useState } from "react";
import Button from "./button";
import IconSortBySVG from "@/assets/sort-by.svg"
import Card from "./card";
import Select from "./select";
import * as api from '@/api'

export default function SortBy({ onChange }) {
    const [toggle, setToggle] = useState(false);
    const [DocumentTypeOptions, setDocumentTypeOptions] = useState([]);
    const [TeamOptions, setTeamOptions] = useState([]);

    const NameOptions = [
        {
            label: "A-Z",
            value: 'a-z'
        },
        {
            label: "Z-A",
            value: 'z-a'
        }
    ]

    const DateOptions = [
        {
            label: "Newest fisrt",
            value: 'newest-first'
        },
        {
            label: "Oldest first",
            value: 'oldest-first'
        }
    ]

    const StatusOptions = [
        {
            label: "In Progress",
            value: 'in-progress'
        },
        {
            label: "Overview",
            value: 'overview'
        },
        {
            label: "Completed",
            value: 'completed'
        },
    ]

    const [filter, setFilter] = useState({
        name: NameOptions[0],
        date: DateOptions[0],
        team: null,
        doctype: null,
        status: StatusOptions[0]
    })

    useEffect(() => {
        api.get_document_types()
            .then(({ data }) => {
                const items = [...data.map(item => ({label: item.name, value: item.id}))]
                setDocumentTypeOptions(items)
                filter['doctype'] = items[0]
                setFilter({
                    ...filter
                })
            });

        api.get_profile_teams().then(data => data.json())
            .then(({data}) => {
                const items = [...data.map(item => ({label: item.name, value: item.id}))]
                setTeamOptions(items)
                filter['team'] = items[0]
                setFilter({
                    ...filter
                })
            });
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }

    const handleChange = (name, value) => {
        const newFilter = {
            ...filter,
            [name]: value
        }
        setFilter(newFilter)
        onChange({
            name,
            value: value.value,
        })
    }

    return (
        <div className="relative z-[1]">
           <Button 
                label="Sort By" 
                icon={IconSortBySVG} 
                className="px-4 py-[7px] text-[12px] bg-white !text-[#222] border-2 border-[#B8C2CC]"
                onClick={(e) => handleClick(e)}
            />
            <div className={`${!toggle ? 'hidden' : 'flex'} absolute shadow-lg right-0 translate-y-[5px] top-[100%] min-w-[250px]`}>
                <Card className="w-full">
                    <h3 className="text-[20px] font-bold mb-3">Sort By</h3>
                    <div className="mb-2">
                        <Select 
                            label="Name" 
                            options={NameOptions}
                            value={filter.name}
                            onSelect={(event) => handleChange('name', event)}
                        />
                    </div>
                    <div className="mb-2">
                        <Select 
                            label="Date" 
                            options={DateOptions} 
                            value={filter.date}
                            onSelect={(event) => handleChange('date', event)}
                        />
                    </div>
                    <div className="mb-2">
                        <Select 
                            label="Team" 
                            options={TeamOptions}
                            value={filter.team}
                            onSelect={(event) => handleChange('team', event)}
                        />
                    </div>
                    <div className="mb-2">
                        <Select 
                            label="Document Type" 
                            options={DocumentTypeOptions}
                            value={filter.doctype}
                            onSelect={(event) => handleChange('doctype', event)}
                        />
                    </div>
                    <div className="mb-2">
                        <Select 
                            label="Status" 
                            options={StatusOptions}
                            value={filter.status}
                            onSelect={(event) => handleChange('status', event)}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}