
import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useEffect, useState } from 'react'
import MemberAdd from '@/components/member-add.js'

export default function Invite(props) {
    const {roles, onInvite} = props;
    const [members, setMembers] = useState([]);
    const [collaborators, setCollaborators] = useState([]);

    const [popup, setPopUp] = useState({
        success: false,
    })
    
    const canInvite = () => {
        return members.length || collaborators.length
    }

    const handleShare = () => {
        if (canInvite()) {
           onInvite();
        }
    }

    return (<WrapperModal className="!min-w-[600px]" title="Invite Collaborators" open={props.open} {...props}>
                <div className="p-2 w-full h-full">
                    <MemberAdd label="Team members" roles={roles} value={members} onUpdate={(members) => setMembers([...members])} />
                    <MemberAdd label="External collaborators" roles={roles} value={collaborators} onUpdate={(collaborators) => setCollaborators([...collaborators])}  />
                    <a href="#" onClick={handleShare} className={`w-full mt-5 font-bold font-Eina03 inline-block ${ ! canInvite() ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white !text-[14px] rounded-[6px] py-[10px] text-center`}>
                        Send invite
                    </a>
                </div>
            </WrapperModal>);
}