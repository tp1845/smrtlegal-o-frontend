'use client'

import React, { useEffect, useRef, useState } from "react";

export default function CKeditor({ onChange, editorLoaded, value }) {
    const [editor, setEditor] = useState(false);
    const editorRef = useRef();

    useEffect(() => {
        const DecoupledEditor = require("@ckeditor/ckeditor5-build-decoupled-document");
        editorRef.current = {
            DecoupledEditor,
        };

        if (editorLoaded ) {
            if (typeof window !== "undefined") {
                DecoupledEditor
                .create( window.document.querySelector( '.document-editor__editable' ), {
                    // plugins: [ListProperties, List ],
                    toolbar: {
                        items: [
                            'undo', 'redo',
                            '|', 'heading',
                            '|', 'bold', 'italic',
                            '|', 'link', 'uploadImage', 'insertTable', 'mediaEmbed',
                            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                        ]
                    },
                    list: {
                        properties: {
                          styles: true,
                          startIndex: true,
                          reversed: true
                        }
                    },
                    cloudServices: {
                        tokenUrl: 'https://98623.cke-cs.com/token/dev/02cb0bfac12a14cbf591786b363ff7ec79b4fe58f2a5797d91e210124fa1?limit=10',
                        webSocketUrl: 'wss://98623.cke-cs.com/ws',
                        uploadUrl: 'https://98623.cke-cs.com/easyimage/upload/'
                    },
                } )
                .then( editor => {
                    const toolbarContainer = window.document.querySelector( '.document-editor__toolbar' );
                    toolbarContainer.appendChild( editor.ui.view.toolbar.element );
                    editor.setData(value);

                    // Add onChange event listener
                    editor.model.document.on('change:data', () => {
                      const updatedValue = editor.getData();
                      // Call your custom onChange function here
                      onChange(updatedValue);
                    });
                    console.log(editor.plugins.get("list"))
                    window.editor = editor;
                    setEditor(editor);
                } )
                .catch( err => {
                    console.error( err );
                } );
            }

        }
    }, [editorLoaded]);

    return (
        <>
            {
                editorLoaded ? (
                    <div className="document-editor">
                        <div className="document-editor__toolbar"></div>
                        <div className="document-editor__editable-container">
                            <div className="document-editor__editable">

                            </div>
                        </div>
                    </div>
                ) : <span>Editor loading ...</span>
            }
        </>
    )
}