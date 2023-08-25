'use client'

import Card from "@/components/card";
import Select from "@/components/select";
import ToDoSection from "@/components/todo-section";
import { useState } from "react";

export default function Summary() {
    const [options, setOptions] = useState([
        {
            label: 'All',
            value: '',
        },
        {
            label: 'One',
            value: 'one',
        },
        {
            label: 'Two',
            value: 'two',
        },
    ])

    const [filter, setFilter] = useState({
        todo: options[0],
        redlines: options[0],
        resolved: options[0],
    })

    const todos = [
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'panding',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'panding',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'panding',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'panding',
        },
    ]

    const resolveds = [
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'error',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'error',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'error',
        },
    ]

    const redlines = [
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'completed',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'completed',
        },
        {
            title: 'Section 3.4: Indemnification',
            message: '<b>Vincent Chen</b> mentioned <b>Victoria Kettle</b> in a comment',
            created_at: '25 min ago',
            status: 'completed',
        },
    ]

    return (<div>
        <Card>
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-[50px]">
                <div>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold">To do</h3>  
                        <Select 
                            value={filter.todo} 
                            options={options} 
                            className="!min-w-[150px]"
                        />
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                        {
                            todos.map((item, index) => {
                                return (
                                    <ToDoSection data={item} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold">Redlines</h3>  
                        <Select 
                            value={filter.redlines} 
                            options={options} 
                            className="!min-w-[150px]"
                        />
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                        {
                            redlines.map((item, index) => {
                                return (
                                    <ToDoSection data={item} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold">Resolved</h3>  
                        <Select 
                            value={filter.resolved} 
                            options={options} 
                            className="!min-w-[150px]"
                        />
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                        {
                            resolveds.map((item, index) => {
                                return (
                                    <ToDoSection data={item} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Card>
    </div>);
}