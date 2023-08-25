export default function Stepper({ steps, active, onChange }) {
    const handleActiveChange = (step) => {
        if (completedSteps.includes(step.slug)) {
            onChange(step);
        }
    }
    
    const activeIndex = steps.findIndex((curr) => curr.slug === active) + 1
    const procentageProgress = (100 / steps.length);
    const completedSteps = steps.slice(0, activeIndex - 1).map(step => step.slug);

    return (<div className="relative flex justify-around w-full pt-[50px]">
        <span style={{ width: `calc(${procentageProgress * activeIndex}%${activeIndex != steps.length ? ' - ' + Math.floor(procentageProgress / 2) + '%' : ''})` }} className={`absolute top-[50%] z-[2] translate-y-[calc(-50%-10px)] 
                        left-0 border-b-2 transition-all w-full right-0 border-[#4ECFE0] `}></span>
        <span className={`absolute top-[50%] z-[1] translate-y-[calc(-50%-10px)] 
                        left-0 border-b-2 w-full right-0`}></span>
        {steps.map((step, index) => {
            return (<div onClick={() => handleActiveChange(step)} key={index} className="relative text-[#171717] font-Eina03 font-bold text-[14px]  select-none">
                {step.label}
                <div className={`absolute transition-all bg-white z-[2] top-[-42px] left-[50%] translate-x-[-50%] text-[16px] font-normal
                                w-[36px] h-[36px] ${active == step.slug || completedSteps.includes(step.slug) ? 'text-[#4ECFE0] shadow-[0_0_0_4px_rgba(225,225,254,1)] !border-[#4ECFE0] cursor-pointer' : 'text-[#737373]'} 
                                rounded-full border-[#E5E5E5] border-2 flex items-center justify-center ${completedSteps.includes(step.slug) ? '!bg-[#4ECFE0] text-white' : ''}`}>0{index + 1}</div>
            </div>);
        })}
    </div>);
}