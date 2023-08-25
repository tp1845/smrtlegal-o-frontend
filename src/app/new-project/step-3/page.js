'use client'
import Button from '@/components/button';
import Input from '@/components/input';
import { useEffect, useState } from 'react';
import { useNewProject } from '@/context/new-project'
import { useRouter } from 'next/navigation'
import Prompt from "@/popups/prompt";
import { useUser } from '@/context/user';


import UploadArea from '@/components/upload-area.js';
import * as api from '@/api'
import SearchDocumentProperty from '@/components/search-document-property.js';
import CategoryInfo from '../../../popups/category-info';


export default function StepThree() {
    const { push } = useRouter();

    const { project, docCount, setProject } = useNewProject();
    const { user } = useUser();

    const [types, setTypes] = useState([]);
    const [showCategoryInfo, setCategoryPopup] = useState(false);
    const [categories, setCategories] = useState([])
    const [uploadType, setUploadType] = useState(0);
    const [uploadReset, setUploadReset] = useState(0);
    // const [documentCount, setDocumentCount] = useState(0);

    const [popups, setPopups] = useState({
        upload_document: false,
    });

    const [popup, setPopup] = useState({
        prompt: {
            visible: false,
            message: '',
        },
    })

    const handleEdit = () => {
        setPopups({
            ...popups,
            upload_document: true
        })
    }

    const isEditor = () => {
        let members = []
        if (project.team) {
            members = [...project.team.members]
        }

        if (project.members) {
            members = [...members, project.members]
        }

        const meInTeam = members.find(member => member.email == user.email)

        return ['Editor', 'Lead'].includes(meInTeam?.role?.label) || !project.team;

    }

    const handleConfirm = (value) => {
        setPopup({
            prompt: {
                ...popup.prompt,
                visible: false,
            }
        });

        handleDelete(true);
    }

    const handleDelete = (confirmed) => {
        if (!confirmed) {
            setPopup({
                ...popup,
                prompt: {
                    ...popup.prompt,
                    visible: true,
                    message: 'Are you sure you want to delete this document?'
                }
            })
            return;
        }

        if (confirmed === true) {
            setProject({
                ...project,
                document: null,
                documentname: '',
                docContent: '',
                type: '',
                category: ''
            })
            setUploadReset(1);
        }
    }

    const handleUpload = (upload) => {
        setProject({
            ...project,
            document: upload,
            documentname: upload ? removeFileExtension(upload.name) : '',
        });
        setPopups({
            ...popups,
            upload_document: false
        });

        setUploadType(1);

        if (upload == null) {
            setUploadType(0);
        }
    }

    const removeFileExtension = (fileName) => {
        const lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex !== -1 && lastDotIndex !== 0 && lastDotIndex < fileName.length - 1) {
            const nameWithoutExtension = fileName.substring(0, lastDotIndex);
            return nameWithoutExtension;
        } else {
            return fileName;
        }
    }

    const handleEditDocument = (e) => {
        e.preventDefault();
        if (project.document) {
            if (isEditor()) {
                push("/new-project/edit-document")
            } else {
                push("/new-project/view-document")
            }
        }
    }

    const handleClickCategoryInfo = () => {
        setCategoryPopup(true)
    }

    useEffect(() => {
        setProject({
            ...project,
            user: user.id,
            //    document: null//--test
        })
        console.log("project1:");
        console.log(project);

        if (project.document) {
            setUploadType(1);
        }
    }, [])
    if (docCount === -1) {
        return (
            <p>Loading...</p>
        )
    }
    const style1 = (docCount > 0 && uploadType !== 1) == 0 ? '' : 'grid grid-cols-2 gap-4';
    console.log("uploadReset: " + uploadReset);
    return (
        <div>
            <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">Upload document</h3>
            <p className='text-[14px] text-[#737373] mb-[24px]'>Please upload your document or select the existing document from your library</p>

            <div>
                <div className={`mb-[15px] ${style1}`}>
                    <UploadArea onUpload={handleUpload} reset={uploadReset} uploadedfile={project.document} />
                    {(docCount > 0 && uploadType !== 1) &&
                        <div className='flex flex-col items-center justify-center font-Eina03 text-[16px] border-dashed border border-[#E5E5E5] rounded-[6px] bg-[#F6FAFF] py-[20px] text-center' style={{ cursor: 'pointer' }}>
                            <svg className="mb-[18px]" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.9287 8.28564H9.643C8.69622 8.28564 7.92871 9.05316 7.92871 9.99993V25.4285C7.92871 26.3753 8.69622 27.1428 9.643 27.1428H19.9287C20.8755 27.1428 21.643 26.3753 21.643 25.4285V9.99993C21.643 9.05316 20.8755 8.28564 19.9287 8.28564Z" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.3574 12.5715H18.2146" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.3574 16.8572H18.2146" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.3574 21.1428H14.786" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.2148 4.85718H23.3577C23.8124 4.85718 24.2484 5.03779 24.5699 5.35928C24.8914 5.68077 25.072 6.11681 25.072 6.57146V22.8572" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className="text-[#212936] text-[14px] font-bold">Select from library</h3>
                            <p className="text-[#777E86] text-[12px]">Maximum file size 50MB</p>
                        </div>
                    }
                </div>
                {/* <Button label="Upload" onClick={() => { onUpload(form); }} disabled={!(form.file && form.type && form.category)} className="bg-[#1860CC] text-[14px] text-white" /> */}

                <CategoryInfo open={showCategoryInfo} onClose={() => { setCategoryPopup(false) }} />
            </div>

            {uploadType !== 0 ? (
                <div>
                    <Input
                        placeholder="Document name"
                        className="mb-[24px]"
                        value={project.documentname}
                        onInput={(event) => setProject({ ...project, documentname: event.target.value })}
                    />
                    <div className="grid grid-cols-[48px_1fr] gap-[12px] p-2 border rounded-lg mt-[24px]  mb-[24px]">
                        <div className="bg-[#E9F0FB] rounded-[6px] text-center flex  justify-center items-center max-h-[48px]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.8574 17.8572C17.8574 18.2361 17.7068 18.5995 17.4389 18.8674C17.1711 19.1352 16.8076 19.2858 16.4288 19.2858H3.57164C3.19275 19.2858 2.82939 19.1352 2.56148 18.8674C2.29358 18.5995 2.14307 18.2361 2.14307 17.8572V2.14293C2.14307 1.76404 2.29358 1.40068 2.56148 1.13277C2.82939 0.864865 3.19275 0.714355 3.57164 0.714355H10.7145L17.8574 7.85721V17.8572Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.7144 0.714355V7.85721H17.8572" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex">
                            <div>
                                <h3 className="font-bold text-[14px] text-[#232F3E]">{project.document?.name}</h3>
                                <p className="text-[#667085] text-[12px]">{Math.round((project.document?.size / 1024) * 100) / 100} KB</p>
                            </div>
                            <div className="ml-auto flex items-center">
                                <a href="#" onClick={() => handleDelete(false)}>
                                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_49_6734)">
                                            <path d="M1 16.5H13.6866" stroke="#737373" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.91996 12.4633L4.45996 13.0861L5.03663 9.58001L12.7985 1.84115C12.9058 1.73305 13.0333 1.64725 13.1739 1.5887C13.3144 1.53015 13.4652 1.5 13.6174 1.5C13.7697 1.5 13.9204 1.53015 14.061 1.5887C14.2015 1.64725 14.3291 1.73305 14.4363 1.84115L15.6588 3.06369C15.7669 3.1709 15.8527 3.29846 15.9113 3.43901C15.9698 3.57955 16 3.7303 16 3.88255C16 4.0348 15.9698 4.18555 15.9113 4.3261C15.8527 4.46664 15.7669 4.5942 15.6588 4.70142L7.91996 12.4633Z" stroke="#737373" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_49_6734">
                                                <rect width="17" height="17" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                                <a href="#" className="ml-1" onClick={() => handleDelete(false)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5332 7.33343L17.7237 18.6664C17.6539 19.6433 16.8411 20.4001 15.8618 20.4001H8.13796C7.15863 20.4001 6.34581 19.6433 6.27604 18.6664L5.46654 7.33343M10.1332 11.0668V16.6668M13.8665 11.0668V16.6668M14.7999 7.33343V4.53343C14.7999 4.01797 14.382 3.6001 13.8665 3.6001H10.1332C9.61774 3.6001 9.19987 4.01797 9.19987 4.53343V7.33343M4.5332 7.33343H19.4665" stroke="#737373" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='pt-[15px] mb-[24px]'>
                            <div className='grid gap-[16px] grid-cols-[1fr]'>
                                <SearchDocumentProperty
                                    value={project.type}
                                    type="type"
                                    onInput={(value) => setProject({ ...project, type: value })}
                                    placeholder="NDA, MSA, SOW"
                                />
                            </div>
                        </div>
                        <div className='pt-[15px] mb-[24px] relative'>
                            <span onClick={() => { handleClickCategoryInfo() }} className='absolute top-[4px] left-[75px] z-[2] cursor-pointer'>
                                <svg className='w-[18px] h-[18px]' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2857 19.5714C15.4141 19.5714 19.5714 15.4141 19.5714 10.2857C19.5714 5.15736 15.4141 1 10.2857 1C5.15736 1 1 5.15736 1 10.2857C1 15.4141 5.15736 19.5714 10.2857 19.5714Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.2861 10.2856V15.2856" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.2856 7.42857C10.6801 7.42857 10.9999 7.10877 10.9999 6.71429C10.9999 6.3198 10.6801 6 10.2856 6C9.89109 6 9.57129 6.3198 9.57129 6.71429C9.57129 7.10877 9.89109 7.42857 10.2856 7.42857Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <SearchDocumentProperty
                                value={project.category}
                                placeholder="My Documents, Business, Music, Sales, etc."
                                type="category"
                                onInput={(value) => setProject({ ...project, category: value })}
                            />
                        </div>
                    </div>

                    {/* <Button disabled={!project.document} onClick={handleEditDocument} className={`${!project.document ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white w-full text-[14px]`} label={isEditor() ? 'Edit document' : 'View document'} /> */}

                    <Prompt
                        open={popup.prompt.visible}
                        title="Are you sure?"
                        message={popup.prompt.message}
                        onClose={() => { setPopup({ ...popup, prompt: { visible: false } }) }}
                        onConfirm={() => { handleConfirm() }}
                    />
                </div>)
                : <></>
            }
        </div>
    );
}
