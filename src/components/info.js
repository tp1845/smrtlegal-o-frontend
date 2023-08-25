import DocumentPermission from "@/popups/document-permission";
import ProjectPermission from "@/popups/project-permission";
import { useState } from "react";

export default function Info({ type }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true)
    }

    return (<div className="inline-block cursor-pointer">
                <svg onClick={handleClick} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="#4ECFE0" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7V10.2308" stroke="#4ECFE0" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.99999 5.15384C7.25489 5.15384 7.46153 4.94721 7.46153 4.6923C7.46153 4.4374 7.25489 4.23077 6.99999 4.23077C6.74509 4.23077 6.53845 4.4374 6.53845 4.6923C6.53845 4.94721 6.74509 5.15384 6.99999 5.15384Z" stroke="#4ECFE0" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <ProjectPermission open={type == 'project' && open} onClose={() => setOpen( ! open)} />
                <DocumentPermission open={type == 'document' && open} onClose={() => setOpen( ! open)} />
            </div>);
}