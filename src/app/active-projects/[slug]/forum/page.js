'use client'

import Card from "@/components/card";
import Select from "@/components/select";
import SmallTabs from "@/components/small-tabs";
import { useEffect, useState } from "react";
import Comment from "@/components/comment";
import { getRandomColor } from "@/utils/helpers"

export default function Forum() {
    const options = [
        {
            label: 'Comments',
            slug: 'comments'
        }
    ]

    const tabs = [
        {
            label: 'Internal',
            slug: 'internal'
        },
        {
            label: 'External',
            slug: 'external'
        }
    ]

    const [filter, setFilter] = useState({
        option: options[0],
        tab: tabs[0]
    })

    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments([
            {
                user: {
                    name: 'Alex Fisher',
                },
                created_at: 'June 18, 2022 at 08',
                comment: `<strong>Remove</strong> "has"`,
                color: getRandomColor(),
                completed: true,
            },
            {
                user: {
                    name: 'Alex Fisher',
                },
                created_at: 'June 18, 2022 at 08',
                comment: `<strong>Replace</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                color: getRandomColor(),
                completed: false,
            },
            {
                user: {
                    name: 'Alex Fisher',
                },
                created_at: 'June 18, 2022 at 08',
                comment: `<strong>Remove</strong> "has"`,
                color: getRandomColor(),
                completed: true,
            },
        ])
    }, [])

    const handleClickMore = (event) => {
        console.log(event)
    }

    const handleClickCheck = (event) => {
        console.log(event)
    }

    const content = `<p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
   a galley of type and scrambled it to make a type specimen book.</p>
   <br />
    <strong>Background</strong>
    <br />
    <br />
    <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    <br />
    <ul>
        <li>Lorem Ipsum is simply dummy text.</li>
        <li>Lorem Ipsum is simply dummy text.</li>
        <li>Lorem Ipsum is simply dummy text.</li>
    </ul>
   `

    return (<div>
        <div className="grid grid-cols-[1fr_350px] gap-4">
            <Card>
                <h3 className="text-center font-bold text-[20px] mb-5">CKEDitor 5 Functionality</h3>
                <div className="editor max-h-[400px] overflow-y-auto text-[14px] font-Eina03">
                    <div contentEditable={true} dangerouslySetInnerHTML={{__html: content}}>

                    </div>
                </div>
            </Card>
           <div>
                <div className="mb-3">
                    <Select value={filter.option} options={options} />
                </div>
                <div className="mb-3">
                    <SmallTabs 
                        className="bg-white w-full border border-[#B8C2CC]"
                        active={filter.tab} 
                        tabs={tabs} 
                        onChange={e => setFilter({...filter, tab: e})} 
                    />
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                    {
                        comments.map((comment, index) => {
                            return (
                                <div className="mb-3" key={index}>
                                    <Comment data={comment} onMore={(e) => handleClickMore(comment,  e)} onCheck={(e) => handleClickCheck(comment, e)}/>
                                </div>
                            );
                        })
                    }
                </div>
           </div>
        </div>
    </div>);
}