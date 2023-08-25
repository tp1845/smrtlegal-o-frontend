import * as api from '@/api'
import { useEffect, useState } from 'react';

export default function ProjectNotifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const id = location.pathname.split('/').pop();
        api.get_project_notifications(id)
            .then(({ data }) => {
                setNotifications(data);
            })
    }, [])

    const countReadAt = notifications.filter(n => ! n.read_at).length

    return (<div className={`relative shadow  bg-white font-Eina03 rounded-[8px] h-full`}>
                <div className="p-[16px] rounded-[8px] bg-white flex">
                     <h3 className="font-bold text-[20px] text-[#222] mb-2">Notifications</h3>
                    <span className="inline-flex items-center justify-center bg-[#FF9C64] 
                    rounded-full w-[36px] h-[36px] ml-auto text-[12px] font-normal text-white">
                        {
                            countReadAt < 9 ? 0 : ''
                        }
                        {
                            countReadAt
                        }
                    </span>
                </div>
                <div className="p-[18px] h-full">
                    <div className="overflow-y-auto  max-h-[350px]">
                        {
                            notifications.map((notify, key) => {
                                return (
                                    <div key={key} className="flex border-b py-[12px] text-[14px]">
                                        <p className='inline-block mr-2' dangerouslySetInnerHTML={{__html: notify.data.message }}></p>
                                        <span className="text-[#737373] text-[12px] ml-auto">{notify.created_at_humans}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>);
}