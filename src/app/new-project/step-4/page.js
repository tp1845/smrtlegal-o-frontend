'use client'
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function StepFour() {
    const { push } = useRouter()

    const handleClick = () => {
        push('/active-projects')
    }

    return (<div className="font-Eina03 pt-[30px] flex flex-col">
        <h3 className="mb-[24px] text-[#222] text-[20px] font-bold">We&apos;re Analyzing Your Document...</h3>
        <p className="text-[14px] ">You can browse this site while analyzing.</p>

        <Button onClick={handleClick} label="Go to Active Project" className="bg-[#1860CC] text-white text-[14px] mt-[200px]" />
    </div>);
}