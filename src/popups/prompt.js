import Button from '@/components/button.js';
import WrapperModal from './wrapper.js'
import okSVG from '@/assets/ok.svg'

export default function Prompt(props) {
    return (<WrapperModal icon={okSVG} open={props.open} {...props}>
                <p className='text-[14px] text-[#171717] mb-[14px] mb-8' dangerouslySetInnerHTML={{__html: props.message}}>
                   
                </p>
                <div className='flex items-center justify-between text-[14px]'>
                    <Button label="Cancel" onClick={props.onClose} className="bg-[#E9F0FB] !text-[#1860CC] px-4" />
                    <Button label="Confirm" onClick={() => {props.onConfirm()}} className="bg-[#1860CC] text-white px-4" />
                </div>
            </WrapperModal>);
}