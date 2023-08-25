
import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useEffect, useState } from 'react'
import SmallTabs from '@/components/small-tabs.js'
import Alert from '@/components/alert.js'
import { getAttrFromName } from '@/utils/helpers.js'


export default function RequestChangePopUp(props) {
    let {roles, members = [], onChange, project } = props;
    roles = roles.map(role => ({label: role.name, value: role.id}));

    const tabs = [
        {
            label: 'Members',
            slug: 'members'
        },
        {
            label: 'Leads',
            slug: 'leads'
        }
    ]

    const [activeTab, setActiveTab] = useState(tabs[0])
    const [users, setUsers] = useState([...members])

    const handleChangeTab =  (tab) => {
        setActiveTab(tab)
    }

    const onChangeRole = (member, role) => {
        setUsers([
            ...(users.map((user) => {
                return {
                    ...user,
                    pivot: {
                        ...user.pivot,
                        role_id: user.id == member.id ? role.value : user.pivot.role_id,
                    }
                }
            }))
        ])
    }

    useEffect(() => {
        setUsers(members)
    }, [members])

    return (<WrapperModal title={`${project?.team?.name} team`} open={props.open} {...props} className='!max-w-[100%] w-fit'>
                <div className='flex flex-col'>
                    <SmallTabs tabs={tabs} active={activeTab} onChange={handleChangeTab} />
                    <div className='font-normal !text-[10px] my-3'>
                        {/* <Alert message={'Unfortunately, you don’t have permission to make the change.'} type="error" /> */}
                    </div>
                    <div>
                        {
                            users.map((member, index) => {
                                return (
                                    <div className="grid grid-cols-[210px_1fr_130px] gap-[16px] mb-[12px] font-Eina03 text-[14px]" key={`${index}`}>
                                        <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                                            <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter">
                                                
                                                {
                                                    member.user && member.user.avatar ? 
                                                    <img src={member.user.avatar} className="w-full h-full object-contain" />
                                                    :
                                                    getAttrFromName(member.fname ? member.fname + ' ' + member.lname : (member.name ? member.name : member.email))
                                                }
                                            </div>
                                            <h3>{ member.fname ? member.fname + ' ' + member.lname : (member.name ? member.name : member.email) }</h3>
                                        </div>
                                        <div className="flex items-center rounded-[6px] py-[10px] px-[12px] bg-white">
                                            { member.email }
                                            <div className="ml-auto">
                                                <Select 
                                                    options={roles}
                                                    value={roles.find(role => role.value == member.pivot.role_id)}
                                                    className=" px-[10px] !text-[12px] border-none !py-[0]"
                                                    onSelect={(newRole) => onChangeRole(member, newRole)}
                                                />
                                            </div>
                                        </div>
                                        <a href="#" onClick={() => onChange(member)} className="rounded-[6px] bg-[#1860CC] text-white border-none whitespace-nowrap text-center border font-bold text-[12px] border-[#737373] text-[#737373] py-[10px] px-[12px]">
                                            Request change
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
            </WrapperModal>);
}