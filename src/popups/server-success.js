import WrapperModal from './wrapper.js'
import okSVG from '@/assets/ok.svg'

export default function ServerSuccess(props) {
    return (<WrapperModal icon={okSVG} open={props.open} {...props}>
                <div className='text-[14px] text-[#171717] mb-[14px]' dangerouslySetInnerHTML={{__html: props.message}}>
                  
                </div>
            </WrapperModal>);
}