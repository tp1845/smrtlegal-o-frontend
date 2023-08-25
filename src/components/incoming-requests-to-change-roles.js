'use client'

import { useEffect, useState } from "react";
import Button from "./button";
import * as api from '@/api'
import ServerSuccess from "@/popups/server-success";
import ServerError from "@/popups/server-error";

export default function IncomingRequestsToChangeRoles({ user }) {
    const [requests, setRequests] = useState([]);

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

    useEffect(() => {
        if (window.echoInstance) {
            window.echoInstance.private(`App.Models.User.${user.id}`)
            .notification((notification) => {
                getNotifications();
            });
        }
        
        getNotifications();
    }, [user])

    const getNotifications = () => {
        setRequests([])
        api.get_notifications().then((data) => {
            data = data.data || [];
            data = data.filter(data => ! data.read_at && ['App\\Notifications\\RequestsToChangeRole'].includes(data.type))
            setRequests(data)
        })
    }

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

    return (<div className="pt-[25px] text-[14px]">
        {
            requests.map((request, key) => {
                return (
                    <div key={key} className="flex mb-2">
                        <div className="flex items-center rounded-lg py-2 px-3  w-full bg-[#FBE3E2] mr-4">
                            <div className="mr-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="#D94042" />
                                </svg>
                            </div>
                            <span dangerouslySetInnerHTML={{__html: request.data.message}}></span>
                        </div>
                        <div className="grid grid-cols-[110px_110px] gap-[15px] items-center ml-auto">
                            <Button onClick={() => handleAccept(request)} label="Accept" className="bg-[#297FFF] text-white text-[14px] font-Eina03 font-bold" />
                            <Button onClick={() => handleReject(request)} label="Reject" className="!text-[#012D55] !border-[#012D55] border text-[14px] font-Eina03 font-bold" />
                        </div>
                    </div>
                )
            })
        }
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