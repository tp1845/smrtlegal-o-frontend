'use client'
import PendingRequsets from "@/components/pending-requsets";
import ProjectDetailsInfo from "@/components/project-details-info";
import ProjectNotifications from "@/components/project-notifications";

import { useProject } from '@/context/project';

export default function ProjectDetails() {
    
    const {project, roles} = useProject();

    return (<div>
        <div className="grid gap-[20px] grid-cols-[1fr_1fr_1fr] pb-8">
            <div>
                <ProjectDetailsInfo project={project} roles={roles} />
            </div>
            <div>
                <ProjectNotifications project={project} />
            </div>
            <div>
                <PendingRequsets  project={project} />
            </div>
        </div>
    </div>);
}