export default function ProjectDetailsStepper({ steps, active, onChange }) {
    const handleActiveChange = (step) => {
        // onChange(step);
    }

    const activeIndex = steps.findIndex((curr) => curr.slug === active) + 1
    const procentageProgress = (100 / (steps.length - 1));
    const completedSteps = steps.slice(0, activeIndex - 1).map(step => step.slug);

    return (<div className="relative flex justify-between w-full pt-[50px]">
        <span style={{width: `${(procentageProgress * activeIndex) - procentageProgress}%`}} className={`absolute top-[50%] z-[2] translate-y-[calc(-50%-5px)] 
                        left-0 border-b-2 transition-all w-full right-0 border-[#75DD7F] `}></span>
        <span className={`absolute top-[50%] z-[1] translate-y-[calc(-50%-5px)] 
                        left-0 border-b-2 w-full right-0`}></span>
        { steps.map((step, index) => {
            return (<div onClick={() => handleActiveChange(step)} key={index} className="relative text-white font-Eina03 font-bold text-[10px] cursor-pointer select-none">
                        {step.label}
                        <div className={`absolute transition-all bg-white z-[2] top-[-42px] left-[50%] translate-x-[-50%] text-[16px] font-normal
                                w-[36px] h-[36px] ${active == step.slug || completedSteps.includes(step.slug) ? 'text-[#4ECFE0] !border-[#75DD7F]' : 'text-[#737373]'} 
                                rounded-full border-[#E5E5E5] border-2 flex items-center justify-center bg-[#012D55] ${ completedSteps.includes(step.slug) ? '!bg-[#75DD7F] text-white' : '' }`}>
                                    {
                                         completedSteps.includes(step.slug) ? (
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.16602 6.8335L4.49935 10.1668L12.8327 1.8335" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                         ): <></>
                                    }
                                    {
                                        active == step.slug &&  ! completedSteps.includes(step.slug) ? (
                                            <div className="w-3 h-3 bg-[#75DD7F] rounded-full"></div>
                                        ): <></>
                                    }
                                </div>
                    </div>);
        }) }
    </div>);
}