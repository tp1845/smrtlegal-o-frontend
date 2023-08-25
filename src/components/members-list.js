import { getAttrFromName } from '@/utils/helpers'
import Select from "@/components/select"
import * as api from '@/api'

export default function MembersList({ team, members, roles, getTeams, disabledRoles = [] }) {
    members = members || []
    const onChangeRole = (member, role) => {
        api.update_role_on_team({
            team_id: team.id,
            email: member.email,
            role: role.value
        }).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                return ;
            }

            getTeams();
        })
    }

    const handleRemoveMember = (member) => {
        api.remove_member_from_team({
            team_id: team.id,
            email: member.email
        })
            .then(data => data.json())
            .then((data) => {
                const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length || data.exception) {
                        const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                        return ;
                    }

                    getTeams()
            })
    }


    return ( <div className="flex flex-col pt-[24px] mb-[36px] ">
    {
        members.map((member, index) => {
            return (
                <div className="grid grid-cols-[210px_1fr_85px] gap-[16px] mb-[12px] font-Eina03 text-[14px]" key={`${team.id}-${index}`}>
                    <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                        <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter">
                            
                            {
                                member.user && member.user.avatar ? 
                                <img src={member.user.avatar} className="w-full h-full object-contain" />
                                :
                                getAttrFromName(member.name ? member.name : member.email)
                            }
                        </div>
                        <h3>{ member.name ? member.name : member.email }</h3>
                    </div>
                    <div className="flex items-center rounded-[6px] py-[10px] px-[12px] bg-white">
                        { member.email }
                        <div className="ml-auto">
                            <Select 
                                options={roles.filter(option => ! disabledRoles.includes(option.label))}
                                value={roles.find(role => role.value == member.role_id)}
                                className=" px-[10px] !text-[12px] border-none !py-[0]"
                                onSelect={(newRole) => onChangeRole(member, newRole)}
                            />
                        </div>
                    </div>
                    <a href="#" onClick={() => handleRemoveMember(member)} className="rounded-[6px] text-center border font-bold text-[12px] border-[#737373] text-[#737373] py-[10px] px-[12px] bg-white">
                        Remove
                    </a>
                </div>
            )
        })
    }
</div>);
}