'use client'
import Select from "@/components/select";
import { useState, useEffect } from "react";
import CreateNewTeam from "@/popups/create-new-team";
import * as api from '@/api'
import { getAttrFromName } from '@/utils/helpers'
import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';
import MembersList from "@/components/members-list";
import Button from "@/components/button";
import MemberAdd from "@/components/member-add";
import { useNewProject } from '@/context/new-project'
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user";
import Info from "@/components/info";

export default function StepTwo() {
    const { push } = useRouter();

    const { user } = useUser();

    const [openSignatoryCreator, setOpenSignatoryCreator] = useState(false);
    const [require_approvals, setRequireApprovals] = useState(true);
    const { project, setProject, handleNext } = useNewProject();
    const [addSignatory, setAddSignatory] = useState(false);

    const [popups, setPopUps] = useState({
        create_new_team: false,
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            title: 'Success',
            visible: false,
            message: '',
        },
    })

    const [teams, setTeams] = useState([
        {
            label: 'Not selected',
            value: '',
        }
    ])

    const [roles, setRoles] = useState([])

    useEffect(() => {
        api.roles()
            .then(data => data.json())
            .then((data) => {
                if (data && data.data) {
                    const roles = [
                        {
                            label: 'Set role',
                            value: ''
                        },
                        ...data.data.map(role => ({ label: role.name, value: role.id }))
                    ]
                    setRoles(roles)
                }
            })

        getTeams();
    }, [])

    const getApproversOptions = () => {

        let members = (activeTeam?.members ?? []).map(approver => {
            return {
                label: approver.name,
                value: approver.email
            }
        });

        const items = [{
            label: 'Not selected',
            value: null,
        }, ...members, ...(project.signatories).map(item => ({ label: item.name, value: item.email })), {
            label: (() => {
                return (
                    <div className="flex items-center">
                        <svg className="mr-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5.30774V12.6924" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.30762 9.00012H12.6922" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.3077 1H4.69231C2.6531 1 1 2.6531 1 4.69231V13.3077C1 15.3469 2.6531 17 4.69231 17H13.3077C15.3469 17 17 15.3469 17 13.3077V4.69231C17 2.6531 15.3469 1 13.3077 1Z" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        Other
                    </div>
                )
            })(),
            value: 'other'
        }]

        return [...items];
    }

    const handleSelectFinalApprover = (approver) => {
        if (approver.value == 'other') {
            setAddSignatory(true);
            setOpenSignatoryCreator(false)
            setTimeout(() => { setOpenSignatoryCreator(true) }, 0)
            return;
        }
        setProject({
            ...project,
            final_approver: approver
        })
    }

    const [activeTeam, setActiveTeam] = useState(teams[0])
    const onChangeTeam = (team) => {
        let newActiveTeam = team;
        let newProject = project;

        const signatories = team.members ? team.members.filter(item => item.role.slug === "signatory") : [];

        newProject = {
            ...newProject,
            team,
            save_for_future: team.value ? true : false,
            signatories: [...signatories]
        }

        if (team.members && team.members.length) {
            const inTeam = team.members.find(item => item.email == user.email)
            if (inTeam) {
                newProject = {
                    ...newProject,
                    leads: {
                        ...newProject.leads,
                        [user.email]: true,
                    }
                }
            }

            const editorExist = team.members.find(item => item.role.slug == 'editor')
            if (!editorExist) {
                const membersWithNewEditor = team.members.map((member) => {
                    return member.email == user.email ? {
                        ...member,
                        role_id: 4,
                        role: {
                            id: 4,
                            name: 'Editor',
                            label: 'Editor',
                            slug: 'editor',
                        }
                    } : { ...member }
                })

                newActiveTeam = {
                    ...team,
                    members: membersWithNewEditor
                }

                newProject = {
                    ...newProject,
                    team: {
                        ...team,
                        members: membersWithNewEditor
                    }
                }
            }
        }

        setActiveTeam(newActiveTeam);
        setProject(newProject);
    }

    const handleCreateNewTeam = () => {
        setPopUps({
            ...popups,
            create_new_team: true
        })
    }

    const onCreateTeam = (data) => {
        api.create_team({
            ...data,
            redirect: `${location.protocol + "//" + location.host}`
        }).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopUps({
                    ...popups,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return;
            }

            setPopUps({
                ...popups,
                server_success: {
                    title: 'Success',
                    visible: true,
                    message: data.message
                }
            })

            setProject({
                ...project,
                save_for_future: true
            })
            getTeams();
        })
    }

    const getTeams = () => {
        api.get_profile_teams()
            .then(data => data.json())
            .then((data) => {
                if (data && data.data && data.data.length) {

                    const teams = [
                        ...data.data.map(team => {
                            const members = team.members.map(mem => ({ ...mem, role: { ...mem.role, label: mem.role.name } }))
                            return ({ label: team.name, value: team.id, ...team, members: members })
                        })
                    ]

                    let targetTeam = activeTeam.id && teams.length ? { ...teams.find(team => activeTeam.id == team.id) } : teams[0]
                    if (!Object.keys(targetTeam).length) {
                        targetTeam = teams[0]
                    }

                    if (project.team) {
                        targetTeam = teams.find(team => team.id == project.team.id)
                        setActiveTeam(targetTeam)
                    }
                    setTeams([
                        {
                            label: 'Not selected',
                            value: '',
                        },
                        ...teams
                    ])
                }

                if (data.data && !data.data.length) {
                    setTeams([])
                    setActiveTeam({ label: 'Not selected', value: '', members: [] })
                }
            })
    }

    const handleExternalCollaborators = (members) => {
        setProject({
            ...project,
            external_collaborators: members
        })
    }

    const handleUpdateSignatory = (members) => {
        setProject({
            ...project,
            signatories: members
        })
    }

    const handleUpdateMembers = (members) => {
        setProject({
            ...project,
            members: members
        })
    }

    // const canAddManuallySignature = () => {
    //     const members = activeTeam && activeTeam.members ? [...activeTeam?.members] : []
    //     const signatory = members.filter(item => item.role.slug == "signatory");

    //     return ! signatory.length;
    // }

    const handleRemoveMember = (member) => {
        setActiveTeam({
            ...activeTeam,
            members: activeTeam.members.filter(item => item.email != member.email)
        })
    }

    const onChangeRole = (member, role) => {
        const newActiveTeam = {
            ...activeTeam,
            members: [
                ...activeTeam.members.map(item => {
                    if (item.email == member.email) {
                        return {
                            ...item,
                            role_id: role.value,
                            role: {
                                id: role.value,
                                label: role.label,
                                slug: role.slug,
                            }
                        }
                    }
                    return { ...item }
                })
            ]
        }

        api.update_role_on_team({
            team_id: activeTeam.id,
            email: member.email,
            role: role.value
        }).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopUps({
                    ...popups,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return;
            }

            getTeams();

            setPopUps({
                ...popups,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })

        })

        setActiveTeam(newActiveTeam)
        setProject({
            ...project,
            team: newActiveTeam,
        })
    }

    const updateLeads = (member) => {
        if (!project.leads[member.email]) {
            project.leads[member.email] = false
        }

        project.leads[member.email] = !project.leads[member.email]
        setProject({
            ...project,
            leads: { ...project.leads },
        })
    }

    return (<div>
        <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">Team & Collaborators</h3>
        {
            !activeTeam.value && (user && user.email) ? (
                <div className="grid grid-cols-[210px_1fr_85px] items-center gap-[16px] mb-[12px] font-Eina03 text-[14px]">
                    <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                        <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter">
                            {
                                user.avatar ?
                                    <img src={user.avatar} className="w-full h-full object-contain" />
                                    : getAttrFromName(user.fname ? user.fname + ' ' + user.lname : user.email)
                            }
                        </div>
                        <h3>{user.fname ? user.fname + ' ' + user.lname : user.email}</h3>
                    </div>
                    <div>
                        {user.email}
                    </div>
                </div>
            ) : <></>
        }
        <Select
            label="Select the team"
            options={teams}
            value={activeTeam}
            onSelect={onChangeTeam}
        >
            <div className="px-[24px] flex py-[15px] !pl-[10px] items-center cursor-pointer text-[#1860CC] font-bold font-Eina03" onClick={handleCreateNewTeam}>
                <svg className="mr-[8px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_49_19660)">
                        <path d="M8.99972 17.3569C13.6152 17.3569 17.3569 13.6152 17.3569 8.99972C17.3569 4.3842 13.6152 0.642578 8.99972 0.642578C4.3842 0.642578 0.642578 4.3842 0.642578 8.99972C0.642578 13.6152 4.3842 17.3569 8.99972 17.3569Z" stroke="#74A6F1" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 5.14258V12.8569" stroke="#74A6F1" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.14258 9H12.8569" stroke="#74A6F1" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_49_19660">
                            <rect width="18" height="18" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                Create new team
            </div>
        </Select>
        <div className="mt-3">
            {
                (activeTeam?.members || []).map((member, index) => {
                    return (
                        <div className="grid grid-cols-[210px_1fr_85px] gap-[16px] mb-[12px] font-Eina03 text-[14px]" key={`${activeTeam.id}-${index}`}>
                            <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                                <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter">

                                    {
                                        member.user && member.user.avatar ?
                                            <img src={member.user.avatar} className="w-full h-full object-contain" />
                                            :
                                            getAttrFromName(member.name ? member.name : member.email)
                                    }
                                </div>
                                <h3>{member.name ? member.name : member.email}</h3>
                            </div>

                            <div className="flex items-center rounded-[6px] py-[10px] px-[12px] bg-white">
                                <div className=""> {member.email}</div>
                                <div className="ml-auto">
                                    <label className="font-Eina03 text-[#222] flex items-center" onClick={(e) => { updateLeads(member) }}>
                                        <div className={`w-[18px] h-[18px] ${project.leads[member.email] ? 'bg-[#4ECFE0]' : 'border-2 border-[#D4D4D4]'} rounded-[3px] text-white flex items-center justify-center`}>
                                            {
                                                project.leads[member.email] ? (
                                                    <span>
                                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7851 1.31402C10.9568 1.47146 10.9684 1.73832 10.811 1.91007L4.62349 8.66007C4.54573 8.7449 4.43671 8.79428 4.32166 8.79678C4.20662 8.79928 4.09555 8.75468 4.01419 8.67331L1.20169 5.86081C1.03694 5.69606 1.03694 5.42894 1.20169 5.26419C1.36644 5.09944 1.63356 5.09944 1.79831 5.26419L4.29925 7.76513L10.189 1.33993C10.3465 1.16818 10.6133 1.15658 10.7851 1.31402Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                ) : <></>
                                            }
                                        </div>
                                        <span className="cursor-pointer select-none ml-2" >
                                            Lead
                                            <div className="ml-3 inline-block">
                                                <Info type="project" />
                                            </div>
                                        </span>
                                    </label>
                                </div>
                                <div className="max-w-[100px] flex items-center">
                                    <Select
                                        options={roles.filter(option => !["Owner", "Lead", "Signatory"].includes(option.label))}
                                        value={roles.find(role => {
                                            if (member.role.label) {
                                                if (['Viewer', 'Editor'].includes(member.role.label)) return role.value == member.role_id
                                                else if (member.role.label === 'Lead') return role.value == '4';
                                            }

                                        })}
                                        className=" px-[10px] !text-[12px] border-none !py-[0]"
                                        onSelect={(newRole) => onChangeRole(member, newRole)}
                                    />
                                    <div className="inline-block">
                                        <Info type="document" />
                                    </div>
                                </div>
                            </div>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleRemoveMember(member) }} className="rounded-[6px] text-center border font-bold text-[12px] border-[#737373] text-[#737373] py-[10px] px-[12px] bg-white">
                                Remove
                            </a>
                        </div>
                    )
                })
            }
        </div>
        <div className=" mb-[24px]">
            <MemberAdd label="Add team members"
                subtitle="Invite members from your company to this project"
                value={project.members}
                exclude={[...project.members, ...project.external_collaborators, ...project.signatories, ...(activeTeam?.members ?? [])]}
                roles={roles}
                onUpdate={handleUpdateMembers}
                withLead={true}
                disabledRoles={['Owner', 'Lead', 'Signatory']}
            />
        </div>
        {
            addSignatory ? (
                <div className="mb-[24px]">
                    <MemberAdd label="Add Signatory"
                        subtitle="Enter the information for the user on your team who will sign the document's final version."
                        value={project.signatories}
                        exclude={[...project.members, ...project.external_collaborators, ...project.signatories, ...(activeTeam?.members ?? [])]}
                        roles={[]}
                        onUpdate={handleUpdateSignatory}
                        disabledRoles={['Owner', 'Lead', 'Signatory']}
                        withLead={true}
                        open={openSignatoryCreator}
                    />
                </div>
            ) : <></>
        }

        <div className=" mb-[24px]">
            <MemberAdd label="Add external collaborators"
                subtitle="Invite 3rd party users from the company or group you're working with to this project."
                value={project.external_collaborators}
                exclude={[...project.members, ...project.external_collaborators, ...project.signatories, ...(activeTeam?.members ?? [])]}
                roles={[]}
                disabledRoles={['Owner', 'Lead', 'Signatory']}
                onUpdate={handleExternalCollaborators}
                withLead={true}
            />
        </div>

        <div className="my-2">
            {
                require_approvals ? (
                    <>
                        <h3 className='font-Eina03 font-bold text-[14px] text-[#222] mt-[56px] mb-[24px] flex items-center'>Who will sign the final document?</h3>
                        <div>
                            <Select
                                options={getApproversOptions()}
                                value={project.final_approver}
                                onSelect={handleSelectFinalApprover}
                            />
                        </div>
                    </>
                ) : <></>
            }

            {
                activeTeam.members ? (
                    <label className="font-Eina03 text-[12px] text-[#222] flex items-center" onClick={() => setProject({ ...project, save_for_future: !project.save_for_future })}>
                        <div className={`w-[18px] h-[18px] ${project.save_for_future != false ? 'bg-[#4ECFE0]' : 'border-2 border-[#D4D4D4]'} rounded-[3px] text-white flex items-center justify-center`}>
                            {
                                project.save_for_future ? (
                                    <span>
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7851 1.31402C10.9568 1.47146 10.9684 1.73832 10.811 1.91007L4.62349 8.66007C4.54573 8.7449 4.43671 8.79428 4.32166 8.79678C4.20662 8.79928 4.09555 8.75468 4.01419 8.67331L1.20169 5.86081C1.03694 5.69606 1.03694 5.42894 1.20169 5.26419C1.36644 5.09944 1.63356 5.09944 1.79831 5.26419L4.29925 7.76513L10.189 1.33993C10.3465 1.16818 10.6133 1.15658 10.7851 1.31402Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                ) : <></>
                            }
                        </div>
                        <span className="px-[12px] py-[26px] cursor-pointer select-none" >
                            Save {/*<strong>Approvers</strong> and */}<strong>Signatories</strong> for this team for future projects
                        </span>
                    </label>
                ) : <></>
            }
        </div>
        <Button label="Skip and later" onClick={() => handleNext()} className="bg-[#1860CC] !text-white font-bold !w-full text-[14px] px-[20px]" />
        <CreateNewTeam
            open={popups.create_new_team}
            onSave={onCreateTeam}
            roles={roles}
            disabledRoles={['Owner', 'Lead', 'Signatory']}
            onClose={() => setPopUps({ ...popups, create_new_team: false })}
        />

        <ServerError
            open={popups.server_error.visible}
            title="Error"
            message={popups.server_error.message}
            onClose={() => { setPopUps({ ...popups, server_error: { visible: false } }) }}
        />

        <ServerSuccess
            open={popups.server_success.visible}
            title={popups.server_success.title}
            message={popups.server_success.message}
            onClose={() => { setPopUps({ ...popups, server_success: { visible: false } }) }}
        />
    </div>);
}