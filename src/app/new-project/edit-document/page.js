"use client";

import CKeditor from "@/components/ckeditor";
import { useNewProject } from "@/context/new-project";
import { useState, useEffect } from "react";

import jwt from 'jsonwebtoken';
import axios from 'axios';
import FormData from 'form-data';

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
      const accessKey = 'K9Aa1efgyq7rDtRuZUkmCxooaGJL3fXCRKzwYZ5RfxVvgcChqzY4ZfohapFO';
      const environmentId = 'u5gGisqGXzPJ21UGgTo4';
      const token = jwt.sign({ aud: environmentId }, accessKey)
      const config = {
        headers: {
          'Authorization': token
        }
      };

      const conversionConfig = {
        default_styles: true,
        collaboration_features: {
          user_id: 'example_user_id',
          comments: true,
          track_changes: false
        }
      };
      const formData = new FormData();
      formData.append('config', JSON.stringify(conversionConfig));
      formData.append('file', project.document, project.documentname);
      axios.post('https://docx-converter.cke-cs.com/v2/convert/docx-html', formData, config)
        .then(response => {
          const html = response.data.html;
          changeEditordata(html);
          setEditorLoaded(true);
        }).catch(error => {
          console.log('Conversion error', error);
        });

      return;
    }
  };

  const changeEditordata = (data) => {
    setData(data)
    setProject({ ...project, docContent: data })
  }

  return (
    <div className="mt-[35px] editor-container">
      <CKeditor
        onChange={(data) => {
          changeEditordata(data);
        }}
        value={data}
        editorLoaded={editorLoaded}
      />
    </div>
  );
}
