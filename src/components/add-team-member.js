import { useState } from "react";
import Input from "./input";
import Select from "./select";

import { validation } from '@/utils/validation'

export default function AddTeamMember({ roles, onAddedNewMember }) {
    const [errors, setErrors] = useState({
        'email': [],
        'password': [],
        'confirm_password': [],
        'terms_and_conditions': [],
    });

    const rules = {
        name: ['required'],
        email: ['email','required'],
        role: ['required']
    }
    

    const [member, setMember] = useState({
        name: '',
        email: '',
        role: {
            label: 'Set role',
            value: ''
        },
    })

    const onChange = (field, value, rules) => {
        setMember({
            ...member,
            [field]: value
        })

        setErrors({
            ...errors,
            [field]: []
        })

        const messages = validation(value, rules);
        
        if (messages.length) {
            setErrors({
                ...errors,
                [field]: [...messages]
            })
        }
    }

    const handleAdd = (e) => {
        e.preventDefault();

        let messages = {}
        for(let field in rules) {
            let message = validation(member[field], rules[field]);
            messages[field] = message
        }

        setErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            
        }

        if (member.name && member.email && member.role && member.role.value) {
            onAddedNewMember(member)
            setMember({
                name: '',
                email: '',
                role: {
                    label: 'Set role',
                    value: ''
                },
            })
        }
    }

    const setActiveRole = (role) => {
        setMember({
            ...member,
            role: role
        })
    }

    return (
        <div className='mb-[24px]'>
                <div className='grid grid-cols-[210px_1fr] gap-[16px] mb-[24px]'>
                    <div>
                        <Input 
                            placeholder="Full name"
                            className="text-[14px] placeholder:text-[14px]"
                            errors={errors.name}
                            onInput={(e) => { onChange('name', e.target.value, rules.name);  }}
                            value={member.name}
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder="Email address"
                            className="text-[14px] placeholder:text-[14px]"
                            type="email"
                            errors={errors.email}
                            onInput={(e) => { onChange('email', e.target.value, rules.email);  }}
                            value={member.email}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_85px] gap-[15px] items-center content-center">
                    <Select 
                        label="" 
                        options={roles} 
                        value={member.role}
                        onSelect={setActiveRole}
                        className="text-[14px] "
                    />
                    <a href="#" onClick={handleAdd} className={`font-bold font-Eina03 inline-block ${ ! member.name ||  ! member.email || ! member.role.value ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white text-[12px] rounded-[6px] py-[12px] text-center`}>
                        Add
                    </a>
                </div>
            </div>
    );
}