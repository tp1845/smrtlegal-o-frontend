import WrapperModal from './wrapper.js'
import alertSVG from '@/assets/alert.svg'

export default function ServerError(props) {
    return (<WrapperModal icon={alertSVG} open={props.open} {...props}>
                <p className='text-[14px] text-[#171717] mb-[14px]' dangerouslySetInnerHTML={{ __html: props.message }}>
                   
                </p>
            </WrapperModal>);
}