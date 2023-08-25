import WrapperModal from './wrapper.js'
import okSVG from '@/assets/ok.svg'

export default function ServerError(props) {
    return (<WrapperModal icon={okSVG} open={props.open} {...props}>
                <p className='text-[14px] text-[#171717] mb-[14px]'>
                Thank you for verifying your email. You can now close this dialog and login to your account. 
                </p>
            </WrapperModal>);
}