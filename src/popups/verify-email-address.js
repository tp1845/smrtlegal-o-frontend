import WrapperModal from './wrapper.js'
import emailSVG from '@/assets/mail.svg'

export default function VerifyEmailAddress(props) {
   
    return (<WrapperModal icon={emailSVG} open={props.open} {...props}>
                <p className='text-[14px] text-[#171717] mb-[16px]'>
                    We have sent a verification email to your inbox. Please verify your email account now.
                </p>
                <a href="#" onClick={props.handleResend} className='text-[#1860CC] text-[16px] font-bold'>Didn’t receive an email? Resend</a>
            </WrapperModal>);
}