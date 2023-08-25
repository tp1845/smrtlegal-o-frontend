import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useState } from 'react'
import AddTeamMember from '@/components/add-team-member.js'

export default function CreateNewTeam(props) {
    const { onSave, roles, disabledRoles = [] } = props

    const [teamName, setTeamName] = useState("")
    const [members, setNewMember] = useState([])
    const [showAddMember, setShowAddMember] = useState(false)

    const handleAddMember = () => {
        setShowAddMember(!showAddMember)
    }

    const handleSave = (e) => {
        e.preventDefault();

        if (teamName) {
            onSave({
                name: teamName,
                members,
            })
            setTeamName("")
            setNewMember([])
        }
    }

    const onChange = (value) => {
        setTeamName(value)
    }

    const onAddedNewMember = (member) => {
        setNewMember([
            ...members,
            member
        ])
        setShowAddMember(false)
    }

    const handleRemoveMember = (index) => {
        setNewMember([
            ...members.filter((member, indexMember) => {
                return indexMember != index
            })
        ])
    }

    return (<WrapperModal title="Create new team" open={props.open} {...props}>
                <div>
                    <div className='flex flex-col'>
                        <div 
                            className="mb-[24px]">
                            <Input 
                                placeholder="Team name"
                                className="text-[14px] placeholder:text-[14px]"
                                value={teamName}
                                onInput={(e) => onChange(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col'>
                            {
                                members.map((member, index) => {
                                    return (
                                        <div key={ index} className='grid grid-cols-[100px_1fr_1fr_70px] gap-[10px] items-center content-center font-Eina03 !text-[12px]'>
                                            <div className='bg-white shadow rounded-[6px] px-3 py-1 mb-2'>
                                                { member.name }
                                            </div>
                                            <div className='bg-white shadow rounded-[6px] px-3 py-1 mb-2'>
                                                { member.email }
                                            </div>
                                            <div className='bg-white shadow rounded-[6px] px-3 py-1 mb-2'>
                                                { member.role.label }
                                            </div>
                                            <div className='bg-white shadow rounded-[6px] px-3 py-1 mb-2'>
                                                <a href="#" onClick={() => handleRemoveMember(index)}>Remove</a>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className='flex'>
                            <a href="#"  onClick={handleAddMember} className="inline-flex ml-auto mb-[24px] font-bold font-Eina03 !text-[14px] items-center text-[#1860CC] border border-[#1860CC] rounded-[6px] px-[16px] py-[8px]">
                                <svg className="mr-[10px]" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.15407 6.15367C7.30112 6.15367 8.23099 5.22384 8.23099 4.07683C8.23099 2.92983 7.30112 2 6.15407 2C5.00702 2 4.07715 2.92983 4.07715 4.07683C4.07715 5.22384 5.00702 6.15367 6.15407 6.15367Z" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.69231 13.0753H2V11.6907C2.00735 10.9872 2.1929 10.297 2.53933 9.68457C2.88576 9.07217 3.38175 8.55757 3.98099 8.18882C4.58023 7.82007 5.26316 7.60922 5.96598 7.57595C6.66881 7.54268 7.3686 7.68807 8 7.99856" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.2305 8.46191V14.0001" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.46094 11.2305H13.9994" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Add member
                            </a>
                        </div>
                        
                        {
                            showAddMember ? (
                                <AddTeamMember roles={roles.filter(option => ! disabledRoles.includes(option.label))} onAddedNewMember={onAddedNewMember} />
                            ) : <></>
                        }
                        
                        <a href="#" onClick={handleSave} className={`font-bold font-Eina03 inline-block ${ ! teamName.length ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white !text-[14px] rounded-[6px] py-[10px] text-center`}>
                            Save
                        </a>
                    </div>
                </div>
            </WrapperModal>);
}