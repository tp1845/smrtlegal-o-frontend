import React, { useEffect, useState, useRef } from "react";
import * as api from '@/api'
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
let index = 0;

export default function SelectDocumentProperty({ type, placeholder, value, onInput }) {
    const [items, setItems] = useState([]);

    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
      setName(event.target.value);
    };
    const addItem = (e) => {
      e.preventDefault();
      if(name?.length > 0){
        setItems([...items, name]);
      }
      setName('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };

    const handleChange = value => {
      onInput(value);
    };

    useEffect(() => {
        api
        .search_document_property({ type, search: '' })
        .then((data) => {
            if (data.data) {
                setItems(data.data);
            }
        })
    }, []);
    
    return (
        <div className="relative">
            <div className="text-left z-[999]">
                {
                    <label 
                        htmlFor="success" 
                        className="block mb-2 text-sm font-Eina03 font-bold"
                        >{(type=='type')?'Document Type':'Folder'}
                    </label>
                }
                <div className={`relative`}>
                    <Select
                        className={` text-[14px] rounded-[6px] block w-full font-Eina03`}
                        placeholder={placeholder}
                        size={'large'}
                        onChange={handleChange}
                        value={value}
                        placement={'topLeft'}
                        dropdownRender={(menu) => (
                            <>
                            {menu}
                            <Divider
                                style={{
                                margin: '8px 0',
                                }}
                            />
                            <Space
                                style={{
                                padding: '0 8px 4px',
                                }}
                            >
                                <Input
                                placeholder="Please enter name"
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                {(type=='type')?'New Type':'New Folder'}
                                </Button>
                            </Space>
                            </>
                        )}
                        options={items.map((item) => ({
                            label: item,
                            value: item,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}