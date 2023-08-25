'use client'

import { useState } from 'react';
import ProjectDetailsInfo from '@/components/project-details-info';
import { useProject } from '@/context/project';
import Document from '@/components/document';
import Card from '@/components/card';

export default function ArchivedProjectDetails() {
    const {project, roles} = useProject();

    return ( <div className="grid gap-[20px] grid-cols-[400px_1fr] pb-8">
                <ProjectDetailsInfo project={project} editable={false} roles={roles} />
                <Card>
                    {
                        project.document?.path ? (
                            <Document project={project} />
                        ) : <span>loading ...</span>
                    }
                </Card>
            </div>);
}