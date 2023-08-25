export default function SmallTabs({ tabs, active, onChange, className = '' }) {
    
    return (<div className={`border rounded-lg inline-flex items-center justify-center p-2 pr-0 font-Eina03 text-[14px] ${className}`}>
        {
            tabs.map((tab, index) => {
                return (
                    <div 
                        onClick={() => onChange(tab)} 
                        key={index} 
                        className={`mr-2 font-bold w-full text-center cursor-pointer text-[#405D80] rounded-[4px] px-[12px] py-[3px] ${tab.slug == active.slug ? 'bg-[#F3F3F3] text-[#012D55]' : ''}`}
                        >
                            { tab.label }
                            { tab?.icon }
                        </div>
                );
            })
        }
    </div>);
}