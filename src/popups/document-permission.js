import Button from '@/components/button.js';
import WrapperModal from './wrapper.js'

export default function DocumentPermission(props) {
    return (<WrapperModal open={props.open} {...props} title="Document Permissions">
                <div className='text-[14px] text-[#171717] mb-[14px] mb-8'>
                   <div className='mb-3'>
                        <strong>Viewer</strong>: Will read and comment, but <span className='underline underline-2 font-bold'>will not</span> edit, redline or make changes to the document. 
                   </div>
                   <div>
                        <strong>Editor</strong>: Will <span className='underline underline-2 font-bold'>edit, redline and make changes</span> to the document. 
                   </div>
                </div>
            </WrapperModal>);
}