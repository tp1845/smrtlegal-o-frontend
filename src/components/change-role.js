import { useEffect, useState } from "react";
import Alert from "./alert";
import Card from "./card";
import Select from "./select";
import Button from "./button";
import { userAgent } from "next/server";
import * as api from '@/api'
import ServerSuccess from "@/popups/server-success";
import ServerError from "@/popups/server-error";


export default function ChangeRole(props) {
    const { roles, onChange, user } = props
    const [projects, setProjects] = useState([])
    const [selected, setSelected] = useState({
        project: '',
        role: null
    })

    const [popup, setPopup] = useState({
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            visible: false,
            message: '',
        },
    })

    const getProjects = () => {
        api.projects()
        .then((data) => {
          if (data && data.data) {
            const projects = [
                {
                  value: '',
                  label: 'Select project',
                },
                ...data.data.map(project => ({label : project.name, value: project.id, ...project}) )
            ]
            setProjects(projects)
            setSelected({
                ...selected,
                project: projects[0],
            })
          }
        })
    }

    const [show, setShow] = useState(false);
    const [defaultRole, setDefaultRole] = useState(null);

    const handleToggleShow = () => {
        setShow( ! show)   
        if ( ! show) {
            getProjects();
        }
    }

    useEffect(() => {
        getProjects();
    }, [])

    const handleChangeRole = (role) => {
        setSelected({
            ...selected,
            role: role
        })
    }

    const handleChangeProject = (project) => {
        const member = project.team.members.find(member => member.email == user.email);
        if (member) {
            setDefaultRole(member.pivot.role_id);
            const role = roles.find(role => role.value === member.pivot.role_id);
            setSelected({
                project: project,
                role,
            })
        }
    }

    const handleRequestToChange = () => {
        api.request_to_change_role({user_id: user.id, ...selected})
            .then((data) => {
                const errors = data.errors ? Object.values(data.errors) : []
                if (errors.length || data.exception || data.status == 'error') {
                    const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                    setPopup({
                        ...popup,
                        server_error: {
                            visible: true,
                            message
                        }
                    })
                    return ;
                }

                setPopup({
                    ...popup,
                    server_success: {
                        visible: true,
                        message: data.message
                    }
                })

                setSelected({
                    role: null,
                    project: projects[0]
                })
                setDefaultRole(null)

            }).catch(() => {
                setSelected({
                    role: null,
                    project: ''
                })
                setDefaultRole(null)
            })
    }

    const canRequestToChange = () => {
        return selected.role && selected.project &&  selected.role.value != defaultRole
    }

    return (<div className={`relative`}>
        <span onClick={handleToggleShow} className="inline-block mt-1 text-right select-none text-blue-700 border-dashed border-b border-blue-700 text-[14px] cursor-pointer">{ (defaultRole && roles.find(r => r.value === defaultRole).label) || 'Role' }</span>
        <div className={`text-left absolute min-w-[380px] max-w-[380px] right-[0] translate-y-[10px]  shadow-2xl rounded-[8px] ${! show ? 'hidden' : 'block'}`}>
            <Card>
                <div className="flex items-center mb-[22px]">
                    <h3 className="text-[20px] text-[#000] font-bold">Change role</h3>
                    <a href="#" className="ml-auto" onClick={(e) => { e.preventDefault(); handleToggleShow() }}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0003 1.35718H6.00028C3.15996 1.35718 0.857422 3.65971 0.857422 6.50003V18.5C0.857422 21.3404 3.15996 23.6429 6.00028 23.6429H18.0003C20.8406 23.6429 23.1431 21.3404 23.1431 18.5V6.50003C23.1431 3.65971 20.8406 1.35718 18.0003 1.35718Z" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.6348 8.86597L8.36621 16.1345" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.36621 8.86597L15.6348 16.1345" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
                <div>
                    {/* <Alert type="error" 
                        message="Unfortunately, you don’t have permission to make the change."
                        /> */}
                    <div  className="pt-[16px]">
                        <Select 
                            label="Select one of your projects"
                            options={projects}
                            value={selected.project}
                            onSelect={handleChangeProject}
                            ></Select>
                            {
                                selected.project.value ? (
                                    <>
                                        <h3 className="text-[14px] text-[#000] font-bold my-[12px]">Select the role:</h3>
                                        <div className="flex flex-col text-[#171717] text-[14px] font-normal">
                                                {
                                                    roles.map((role, key) => {
                                                        return (
                                                            <label key={key} className="flex items-center mb-[16px] cursor-pointer select-none">
                                                                <div className="w-[18px] h-[18px] flex items-center justify-center rounded-full border-[#4ECFE0] border focus:ring-2 ring-offset-gray-800">
                                                                    {selected.role && selected.role.value === role.value ? <div className="w-2 h-2 bg-[#4ECFE0] rounded-full"></div> : <></> }
                                                                </div>
                                                                <input className="appearance-none checked:bg-[#4ECFE0]" checked={selected.role === role.value} type="radio" name="role" value={role.value} onChange={() => handleChangeRole(role)} />
                                                                <p className="ml-[6px]">{role.label}</p>
                                                            </label>
                                                        )
                                                    })
                                                }
                                        </div>
                                    </>
                                ) : <></>
                            }
                        
                        <Button 
                            disabled={!canRequestToChange()} 
                            className={`${!canRequestToChange() ? 'bg-[#B8C2CC]' : 'bg-[#297FFF]'}  text-white text-center text-[14px] font-Eina03 mt-[20px]`} 
                            onClick={handleRequestToChange}
                            label="Request to change"></Button>
                    </div>
                </div>
            </Card>
        </div>
        <div className="text-left">
            <ServerError 
                open={popup.server_error.visible} 
                title="Error"
                message={popup.server_error.message}
                onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
            />

            <ServerSuccess
                open={popup.server_success.visible} 
                title="Success"
                message={popup.server_success.message}
                onClose={() => {setPopup({...popup, server_success: { visible: false }})}}  
            />
        </div>
    </div>);
}