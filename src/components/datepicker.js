import { useState } from "react";
import Calendar from "./calendar";
import Input from "./input";
import Button from "./button";
import calendarsvg from '@/assets/calendar.svg'
import moment from 'moment';
import * as api from '@/api'

export default function DatePicker({ label, placeholder, value, reminder, onChange, onChangeReminderSettings }) {
    const [open, setOpen] = useState(false)
    const [reminderSettingsMode, setReminderSettingsMode] = useState(false);
    const [date, setDate] = useState(value ? moment(value).format('MM/DD/YYYY') : '')
    const handleSave = (value) => {
        if (reminderSettingsMode) {
            onChangeReminderSettings(value);
        } else {
            onChange(value);
            setDate(moment(value).format('MM/DD/YYYY'));
        }
        
        setOpen(false);
    }

    const handleClickReminderSettings = () => {
        setReminderSettingsMode(true);
        setOpen(true);
    }

    const sendmail = () => {
        api.send_email();
    }

    return (<div className="flex items-center relative z-[10]">
                <Input 
                    label={label}
                    placeholder={placeholder}
                    icon={calendarsvg}
                    className="min-w-[300px]"
                    name="datepicker"
                    type="text"
                    onFocus={() => { setReminderSettingsMode(false); setOpen(true)} }
                    onClick={() => { setReminderSettingsMode(false); setOpen(true)} }
                    value={date}
                    onChange={() => {}}
                    readOnly={true}
                />
                <a href="#" onClick={e => { e.preventDefault(); handleClickReminderSettings(); }} className="whitespace-nowrap text-[#1860CC] underline underline-offset-2 translate-y-[10px] ml-8 text-[14px]">Reminder setting</a>
                {reminder && (
                    <>
                        <br/>
                        <Button 
                            label="Send mail"
                            className="bg-[#4ECFE0] text-[14px] min-w-[80px]"
                            onClick={sendmail}
                        />
                    </>

                )}
                {
                    open ? 
                    <div className="absolute right-[200px] translate-y-[-60%] top-[0] z-[10]" name="newprojectcalendar">
                        <Calendar 
                            reminderMode={reminderSettingsMode} 
                            onSave={handleSave} 
                            onClose={() => setOpen(false)}
                            duedate={value}
                            reminder={reminder}
                        />
                    </div> : <></>
                }
            </div>);
}