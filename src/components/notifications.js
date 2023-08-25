import { useEffect, useState } from "react";
import Card from "./card";
import Button from "./button";
import Image from "next/image";
import belsvg from "@/assets/bell.svg"
import moment from 'moment'
import * as api from '@/api';
import ServerSuccess from "@/popups/server-success";
import ServerError from "@/popups/server-error";

export default function Notifications(props) {
    const { user }  = props

    const [popup, setPopup] = useState({
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            visible: false,
            message: '',
        },
    })

    const [show, setShow] = useState(false);

    const handleToggleShow = () => {
        setShow( ! show)   
        if ( ! show) {
            getNotifications();
        }
    }

    const [notifications, setNotifications] = useState([])

    const handleAccept = (notify) => {
        api.accept_notification(notify)
            .then((data) => {
                const errors = data.errors ? Object.values(data.errors) : []
                if (errors.length || data.exception) {
                    const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                    setPopup({
                        ...popup,
                        server_error: {
                            visible: true,
                            message
                        }
                    })
                    return ;
                }

                setPopup({
                    ...popup,
                    server_success: {
                        visible: true,
                        message: data.message
                    }
                })
                getNotifications();
            })
    }

    const handleReject = (notify) => {
        api.reject_notification(notify)
            .then((data) => {
                const errors = data.errors ? Object.values(data.errors) : []
                if (errors.length || data.exception) {
                    const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                    setPopup({
                        ...popup,
                        server_error: {
                            visible: true,
                            message
                        }
                    })
                    return ;
                }

                setPopup({
                    ...popup,
                    server_success: {
                        visible: true,
                        message: data.message
                    }
                })
                getNotifications();
            })
    }

    const handleRead = (notify) => {
        api.mark_as_readed_notification(notify)
            .then(() => {
                getNotifications();
            })    
    }

    const getNotifications = () => {
        api.get_notifications().then(({ data }) => {
            if (data && data.length) {
                data = data.map(row => {
                    return {
                        id: row.id,
                        user: row.data.from,
                        message: row.data.message,
                        role: row.data.role,
                        team: row.data.team,
                        read_at: row.read_at,
                        created_at: row.created_at_humans,
                        need_to_confirm: row.data.confirm,
                    }
                })
                setNotifications(data);
            }
        })
    }

    useEffect(() => {
        if (window.echoInstance) {
            window.echoInstance.private(`App.Models.User.${user.id}`)
            .notification((notification) => {
                getNotifications();
            });
        }

        getNotifications();
    }, [user])

    return (<div className={`relative`}>
                <span onClick={handleToggleShow} className="relative inline-block text-right select-none text-blue-700 text-[14px] cursor-pointer">
                    <Image src={belsvg} width="48px" height="48px" alt="notify" />
                    {
                        notifications.filter(notify => !notify.read_at).length ? (
                            <span className="absolute top-[0px] right-[2px] rounded-full w-2 h-2 bg-[red]"></span>
                        ) : <></>
                    }
                </span>
                <div className={`text-left absolute min-w-[380px] max-w-[380px] right-[0] translate-y-[10px]  shadow-2xl rounded-[8px] ${! show ? 'hidden' : 'block'}`}>
                    <Card>
                        <div className="flex items-center mb-[22px]">
                            <h3 className="text-[20px] text-[#000] font-bold">Notifications</h3>
                            <a href="#" className="ml-auto" onClick={(e) => { e.preventDefault(); handleToggleShow() }}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.0003 1.35718H6.00028C3.15996 1.35718 0.857422 3.65971 0.857422 6.50003V18.5C0.857422 21.3404 3.15996 23.6429 6.00028 23.6429H18.0003C20.8406 23.6429 23.1431 21.3404 23.1431 18.5V6.50003C23.1431 3.65971 20.8406 1.35718 18.0003 1.35718Z" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.6348 8.86597L8.36621 16.1345" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.36621 8.86597L15.6348 16.1345" stroke="#737373" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>
                        <div className="max-h-[260px] overflow-y-scroll">
                            {
                                notifications.map((notification, key) => {
                                    return (
                                        <div className={`relative border-b px-[10px] py-[12px] ${!notification.read_at ? 'bg-[#F6FAFF]' : ''}`} key={key}>
                                            <h3 className="text-[#4BA3F5] text-[14px] underline underline-offset-2">{notification.team.name}</h3>
                                            <p className="text-[14px] text-[#000] font-Eina03 my-[8px] max-w-[230px]" dangerouslySetInnerHTML={{ __html: notification.message }} >
                                              
                                            </p>
                                            <span className="absolute right-[3px] top-[12px] text-[12px] text-[#737373]">{ notification.created_at }</span>
                                            <div className="grid grid-cols-[110px_110px] gap-[15px] items-center ">
                                                {
                                                    notification.need_to_confirm && ! notification.read_at ? 
                                                    (
                                                        <>
                                                            <Button onClick={() => handleAccept(notification)} label="Accept" className="bg-[#297FFF] text-white text-[14px] font-Eina03 font-bold" />
                                                            <Button onClick={() => handleReject(notification)} label="Reject" className="!text-[#012D55] !border-[#012D55] border text-[14px] font-Eina03 font-bold" />
                                                        </>
                                                    ): <></>
                                                }
                                                {
                                                    ! notification.read_at && ! notification.need_to_confirm ? 
                                                    (
                                                        <>
                                                            <Button onClick={() => handleRead(notification)} label="Mark as read" className="bg-[#297FFF] text-white text-[14px] font-Eina03 font-bold" />
                                                        </>
                                                    ): <></>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>
                <ServerError 
                    open={popup.server_error.visible} 
                    title="Error"
                    message={popup.server_error.message}
                    onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
                />

                <ServerSuccess
                    open={popup.server_success.visible} 
                    title="Success"
                    message={popup.server_success.message}
                    onClose={() => {setPopup({...popup, server_success: { visible: false }})}}  
                />
            </div>);
}