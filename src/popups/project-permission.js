import Button from '@/components/button.js';
import WrapperModal from './wrapper.js'

export default function ProjectPermission(props) {
    return (<WrapperModal open={props.open} {...props} title="Project Permissions">
                <div className="text-[14px] text-[#171717] mb-[14px] mb-8 text-left">
                    <h3 className='mb-3'><strong>Lead: </strong> Assign to team members who will</h3>
                    <ul className='list-disc pl-4'>
                        <li>
                            Add and remove team members
                        </li>
                        <li>
                            Control document permissions (viewer/editor)
                        </li>
                        <li>
                            Monitor and ensure projects tasks are completed and project is finalized.
                        </li>
                    </ul>
                </div>
            </WrapperModal>);
}