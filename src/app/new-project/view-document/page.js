"use client";

import CKeditor from "@/components/ckeditor";
import { useNewProject } from "@/context/new-project";
import { useState, useEffect } from "react";
import * as api from "@/api";

export default function StepFour() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  const { project, setProject } = useNewProject();

  useEffect(() => {
    readFile();
  }, []);

  const readFile = () => {
    if (project.document instanceof Blob) {
      const fd = new FormData();
      fd.append("file", project.document);

      api.convert_file_to_html(fd).then((data) => {
        if (data.data) {
          setData(data.data);
          setEditorLoaded(true);
        }
      });
      return;
    }

    setEditorLoaded(true);
  };

  return (
    <div className="mt-[35px] editor-container">
      <div>{!editorLoaded ? <div>Loading ...</div> : <div dangerouslySetInnerHTML={{ __html: data }}></div>}</div>
    </div>
  );
}
