import { getAttrFromName } from '@/utils/helpers'

export default function Comment({ data, onMore = () => {}, onCheck = () => {} }) {
    const handleClickCheck = (e) => {
        e.preventDefault();
        onCheck();
    }

    const handleClickMore = (e) => {
        e.preventDefault();
        onMore();
    }

    return (
        <div className='bg-white rounded-lg p-4 py-6 border-l-4' style={{borderColor: '#' + data.color}}>
            <div className="flex items-center jusitfy-between">
                <div className="flex">
                    <div className="flex items-between">
                        <div style={{backgroundColor: '#' + data.color}} className="text-[12px]  w-[35px] h-[35px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center text-white tracking-tighter">
                            {
                                data.user && data.user.avatar ? 
                                <img src={data.user.avatar} className="w-full h-full object-contain" />
                                :   
                                getAttrFromName(data.user.name ? data.user.name : data.user.email)
                            }
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[#36475E] font-bold text-[14px]'>{ data.user.name }</h3>
                            <span className='text-[#8FA0B6] text-[12px]'>{ data.created_at }</span>
                        </div>
                    </div>
                </div>
                <div className='ml-auto flex'>
                    <a href="#" onClick={e => handleClickCheck(e) }>
                        <svg width="20"  height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill={ ! data.completed ? "#E5E5E5" : "#75DD7F"} d="M19.575 7.025C19.7083 7.49167 19.8125 7.975 19.8875 8.475C19.9625 8.975 20 9.48333 20 10C20 11.4167 19.7417 12.7333 19.225 13.95C18.7083 15.1667 18 16.225 17.1 17.125C16.2 18.025 15.1417 18.7292 13.925 19.2375C12.7083 19.7458 11.4 20 10 20C8.58333 20 7.26667 19.7458 6.05 19.2375C4.83333 18.7292 3.775 18.025 2.875 17.125C1.975 16.225 1.27083 15.1667 0.7625 13.95C0.254167 12.7333 0 11.4167 0 10C0 8.6 0.254167 7.29167 0.7625 6.075C1.27083 4.85833 1.975 3.8 2.875 2.9C3.775 2 4.83333 1.29167 6.05 0.775C7.26667 0.258333 8.58333 0 10 0C11.0833 0 12.1042 0.158333 13.0625 0.475C14.0208 0.791667 14.9167 1.21667 15.75 1.75C15.9333 1.86667 16.0375 2.025 16.0625 2.225C16.0875 2.425 16.0333 2.60833 15.9 2.775C15.7667 2.94167 15.6 3.04167 15.4 3.075C15.2 3.10833 15.0083 3.06667 14.825 2.95C14.125 2.51667 13.3708 2.16667 12.5625 1.9C11.7542 1.63333 10.9 1.5 10 1.5C7.58333 1.5 5.5625 2.3125 3.9375 3.9375C2.3125 5.5625 1.5 7.58333 1.5 10C1.5 12.4167 2.3125 14.4375 3.9375 16.0625C5.5625 17.6875 7.58333 18.5 10 18.5C12.4167 18.5 14.4375 17.6875 16.0625 16.0625C17.6875 14.4375 18.5 12.4167 18.5 10C18.5 9.58333 18.475 9.18333 18.425 8.8C18.375 8.41667 18.3 8.03333 18.2 7.65C18.15 7.45 18.1625 7.25 18.2375 7.05C18.3125 6.85 18.4417 6.70833 18.625 6.625C18.8083 6.54167 18.9958 6.53333 19.1875 6.6C19.3792 6.66667 19.5083 6.80833 19.575 7.025ZM8 14.025L4.95 10.95C4.8 10.8 4.725 10.6167 4.725 10.4C4.725 10.1833 4.80833 9.99167 4.975 9.825C5.125 9.675 5.30833 9.6 5.525 9.6C5.74167 9.6 5.93333 9.675 6.1 9.825L8.525 12.275L18.325 2.475C18.475 2.325 18.6583 2.24583 18.875 2.2375C19.0917 2.22917 19.2833 2.30833 19.45 2.475C19.6167 2.64167 19.7 2.83333 19.7 3.05C19.7 3.26667 19.6167 3.45833 19.45 3.625L9.05 14.025C8.9 14.175 8.72083 14.25 8.5125 14.25C8.30417 14.25 8.13333 14.175 8 14.025Z" />
                        </svg>
                    </a>
                    <a href="#" className='ml-3' onClick={e => handleClickMore(e) }>
                        <svg stroke="#8792A8" width="4" height="17" viewBox="0 0 4 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.71431 8.64265C2.71431 8.24816 2.39451 7.92836 2.00002 7.92836C1.60553 7.92836 1.28574 8.24816 1.28574 8.64265C1.28574 9.03714 1.60553 9.35693 2.00002 9.35693C2.39451 9.35693 2.71431 9.03714 2.71431 8.64265Z"  strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.71431 15.0714C2.71431 14.6769 2.39451 14.3571 2.00002 14.3571C1.60553 14.3571 1.28574 14.6769 1.28574 15.0714C1.28574 15.4658 1.60553 15.7856 2.00002 15.7856C2.39451 15.7856 2.71431 15.4658 2.71431 15.0714Z"  strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.71431 2.21443C2.71431 1.81994 2.39451 1.50014 2.00002 1.50014C1.60553 1.50014 1.28574 1.81994 1.28574 2.21443C1.28574 2.60891 1.60553 2.92871 2.00002 2.92871C2.39451 2.92871 2.71431 2.60891 2.71431 2.21443Z"  strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className='pt-3'>
                <p className='text-[12px]' dangerouslySetInnerHTML={{__html: data.comment}}></p>
            </div>
        </div>
    );
}