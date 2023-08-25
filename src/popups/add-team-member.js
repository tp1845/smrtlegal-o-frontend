
import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useState } from 'react'
import AddTeamMember from '@/components/add-team-member'

export default function AddTeamMemberPopUp(props) {
    const { onAddedNewMember, roles } = props

    const [members, setNewMember] = useState([])
   
    const [activeRole, setActiveRole] = useState(roles[0])

    const handleAdd = (member) => {
        setNewMember([
            ...members,
            member
        ])
    }

    const handleRemoveMember = (index) => {
        setNewMember([
            ...members.filter((member, indexMember) => {
                return indexMember != index
            })
        ])
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (members.length) {
            onAddedNewMember(members)
            setNewMember([])
        }
    }
   
    return (<WrapperModal title="Add team member" open={props.open} {...props}>
                <div className='flex flex-col'>
                            
                    <AddTeamMember roles={roles} onAddedNewMember={handleAdd} />

                    <div className='flex flex-col mb-3'>
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
                    
                    <a href="#" onClick={handleSave} className={`font-bold font-Eina03 inline-block ${!members.length ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white !text-[14px] rounded-[6px] py-[10px] text-center`}>
                        Save
                    </a>
                </div>
            </WrapperModal>);
}