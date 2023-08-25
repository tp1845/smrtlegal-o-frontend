import Button from '@/components/button.js';
import WrapperModal from './wrapper.js'
import Input from '@/components/input.js';
import Select from '@/components/select.js';
import UploadArea from '@/components/upload-area.js';
import { useEffect, useState } from 'react';
import * as api from '@/api'
import SearchDocumentProperty from '@/components/search-document-property.js';
import CategoryInfo from './category-info.js';

export default function VerifyEmailAddress(props) {
    const { onUpload } = props;

    const [types, setTypes] = useState([]);
    const [showCategoryInfo, setCategoryPopup] = useState(false);
    const [categories, setCategories] = useState([])

    const [form, setForm] = useState({
        others: '',
        type: '',
        category: '',
        file: null
    })

    const handleUpload = (file) => {
        setForm({
            ...form,
            file,
        })
    }

    const handleChangeCategory = (option) => {
        setForm({
            ...form,
            category: option
        })
    }

    const handleChangeTypes = (option) => {
        setForm({
            ...form,
            type: option
        })
    }

    const handleClickCategoryInfo = () => {
        setCategoryPopup(true)
    }

    useEffect(() => {
        api.get_categories().then(({ data }) => {
            data = data || []

            setCategories([
                {
                    label: 'Select category',
                    value: '',
                },
                ...data.map((item) => {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                })
            ]);
        })

        api.get_document_types().then(({ data }) => {
            setTypes([
                {
                    label: 'Select type',
                    value: '',
                },
                ...data.map((item) => {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                })
            ])
        })
    }, [])

    return (
        <div>
            {/* <WrapperModal open={props.open} {...props}> */}
            <div className='grid grid-cols-2 gap-4'>
                <div className='pt-[15px] mb-[24px]'>
                    {/* <h3 className='block mb-2 text-sm font-Eina03 font-bold mb-[8px]'>Document Type</h3> */}
                    <div className='grid gap-[16px] grid-cols-[1fr]'>
                        {/* <Select 
                            options={types}
                            value={form.type}
                            onSelect={handleChangeTypes}
                        /> */}

                        <SearchDocumentProperty
                            value={form.type}
                            type="type"
                            onInput={(value) => setForm({ ...form, type: value })}
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
                        value={form.category}
                        placeholder="My Documents, Business, Music, Sales, etc."
                        type="category"
                        onInput={(value) => setForm({ ...form, category: value })}
                    />
                </div>
            </div>
            <div className='mb-[15px] grid grid-cols-2 gap-4'>
                <UploadArea onUpload={handleUpload} />
                <div className='flex flex-col items-center justify-center font-Eina03 text-[16px] border-dashed border border-[#E5E5E5] rounded-[6px] font-bold bg-[#F6FAFF] py-[20px] text-center'>
                    <svg className="mb-[18px]" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9287 8.28564H9.643C8.69622 8.28564 7.92871 9.05316 7.92871 9.99993V25.4285C7.92871 26.3753 8.69622 27.1428 9.643 27.1428H19.9287C20.8755 27.1428 21.643 26.3753 21.643 25.4285V9.99993C21.643 9.05316 20.8755 8.28564 19.9287 8.28564Z" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.3574 12.5715H18.2146" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.3574 16.8572H18.2146" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.3574 21.1428H14.786" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.2148 4.85718H23.3577C23.8124 4.85718 24.2484 5.03779 24.5699 5.35928C24.8914 5.68077 25.072 6.11681 25.072 6.57146V22.8572" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Select from library
                </div>
            </div>
            <Button label="Upload" onClick={() => { onUpload(form); }} disabled={!(form.file && form.type && form.category)} className="bg-[#1860CC] text-[14px] text-white" />

            <CategoryInfo open={showCategoryInfo} onClose={() => { setCategoryPopup(false) }} />
            {/* </WrapperModal> */}
        </div>
    );

}