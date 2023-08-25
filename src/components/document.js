'use client'
import { useEffect, useState } from "react";

import { getAbsolutePathToDocument } from '@/utils/helpers'
import Card from "./card";

export default function Document({ project }) {
    const [document, setDocument] = useState(null);

    useEffect( () => {
        const path = getAbsolutePathToDocument(project.document?.path);

        if (path) {
            fetch(path)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "text.txt")
                    const fr = new FileReader()
                    fr.onloadend = () => {
                        setDocument(fr.result)
                    }
                    fr.readAsText(file)
                })
        }

    }, [project.path]);

    return (<div className="max-h-[500px] overflow-y-auto">
            {
                document
            }
        </div>);
}