
import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useEffect, useState } from 'react'
import DatePicker from '@/components/datepicker.js'
import userchecksvg from '@/assets/user-check.svg'
import moment from 'moment'
import MemberAdd from '@/components/member-add.js'
import Prompt from './prompt.js'
import ServerSuccess from './server-success.js'

export default function SharePopUp(props) {
    const {roles, project, onShare} = props
    const [share, setShare] = useState({
        email: '',
        link: '',
        duedate: new Date(),
        approvers: [],
        final_approver: {
            label: 'Not selected',
            value: null,
        }
    });

    useEffect(() => {
        setShare({
            ...share,
            link: location.protocol + '//' + location.host + '/share/' + (new Date() * 1) + '/' + project.id
        })
    }, []);

    const [show_approvers, setShowApprovers] = useState(false);

    const [popup, setPopUp] = useState({
        confirm: false,
        success: false,
    })
    
    const handleApprovers = (members) => {
        setProject({
            ...share,
            approvers: [...members]
        })
    }

    const handleSelectFinalApprover = (approver) => {
        setProject({
            ...share,
            final_approver: approver
        })
    }

    const getApproversOptions = () => {
        const items = share.approvers.map(approver => {
            return {
                label: approver.name,
                value: approver.email
            }
        })

        return [
            {
                label: 'Not selected',
                value: null,
            }, ...items];
    }

    const handleShare = (e) => {
        e.preventDefault();

        if (canShare()) {
           onShare(share);
        }
    }

    const handleCopyToClipboard = async () => {
        const text = share.link;
        try {
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
    }

    const canShare = () => {
        const emailregexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return share.email.length && emailregexp.test(share.email);
    }

    return (<WrapperModal className='relative' title="Share project" open={props.open} {...props}>
                <p className='absolute text-[14px] text-[#8792A8] top-[50px] '>Share the link with your partner by entering their email</p>
                <div className='flex flex-col pt-5'>
                    <div>
                        <Input 
                            placeholder="Email address"
                            value={share.email}
                            onInput={(e) => setShare({...share, email: e.target.value})}
                        />
                    </div>
                    <div className='text-center  pt-[20px] pb-[8px]' type="email">
                        <span className='text-[14px] text-[#8792A8]'>or copy sharing link</span>
                    </div>
                    <div className='relative mb-5'>
                        <Input 
                            placeholder="Sharing link" 
                            type="url" 
                            value={share.link}
                            onInput={(e) => setShare({...share, link: e.target.value})}
                        />
                        <a href="#" className='absolute right-[10px] top-[50%] translate-y-[-50%]' onClick={handleCopyToClipboard}>
                            <svg width="15" height="15" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8567 14.2858C16.8567 14.6647 16.7062 15.028 16.4383 15.2959C16.1704 15.5638 15.807 15.7144 15.4282 15.7144H6.14244C5.76356 15.7144 5.4002 15.5638 5.13229 15.2959C4.86438 15.028 4.71387 14.6647 4.71387 14.2858V2.14293C4.71387 1.76405 4.86438 1.40068 5.13229 1.13277C5.4002 0.864865 5.76356 0.714355 6.14244 0.714355H12.571L16.8567 5.00007V14.2858Z" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.5711 19.2857H2.57115C2.19227 19.2857 1.82891 19.1352 1.561 18.8673C1.29309 18.5994 1.14258 18.236 1.14258 17.8571V5" stroke="#4ECFE0" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                    <div className='mb-5 z-[999]'>
                        <DatePicker 
                            label="Suggested Due Date"
                            className="z-[999]"
                            value={share.duedate}
                            placeholder={moment(new Date()).format('MM/DD/YYYY')}
                            onChange={(val) => setShare({...share, duedate: val})}
                        />
                    </div>
                    <div>
                        <Button 
                            label="Add Approvers"
                            icon={userchecksvg}
                            onClick={() => setShowApprovers(!show_approvers)}
                            className="!text-[#1860CC] text-[12px] bg-[#F0F6FF] border border-[#1860CC] mb-[24px] !w-auto !px-[16px] !py-[8px]"
                        />
                        {
                            show_approvers ? (
                                <>
                                    <MemberAdd label="Add Approvers" 
                                        value={share.approvers} 
                                        onUpdate={handleApprovers} 
                                        roles={[]}
                                    />
                                    <h3 className='font-Eina03 font-bold text-[14px] text-[#222] mt-[56px] mb-[24px] flex items-center'>Who will sign the final document?</h3>
                                    <div>
                                        <Select 
                                            options={getApproversOptions()}
                                            value={share.final_approver}
                                            onSelect={handleSelectFinalApprover}
                                        />
                                    </div>
                                </>
                            ) : <></>
                        }
                    </div>
                    <a href="#" onClick={handleShare} className={`mt-5 font-bold font-Eina03 inline-block ${! canShare() ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white !text-[14px] rounded-[6px] py-[10px] text-center`}>
                        Share now
                    </a>
                </div>

            </WrapperModal>);
}