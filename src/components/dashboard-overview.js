
export default function DashboardOverview({ data }) {
    return (
        <div className="rounded-[6px] font-Eina03 bg-[linear-gradient(95.28deg,#C8E3FD_19.31%,#E9F1FE_35.75%,#FFE6E4_68.08%)]">
            <h3 className="px-[32px] pt-[16px] text-[#222] text-[20px] font-bold">Overview</h3>
            <div className="p-[32px] grid grid-cols-[1fr_1fr_1fr] gap-5">
                <div className="rounded bg-[#297FFF] text-white p-[16px]">
                    <div className="text-[45px] font-Eina03 font-normal">{data['on-going'] ?? 0}</div>
                    <span className="text-white font-bold text-[16px]">On-going projects</span>
                </div>
                <div className="rounded bg-[#4ECFE0] text-white  p-[16px]">
                    <div className="text-[45px] font-Eina03 font-normal">{data['pending'] ?? 0}</div>
                    <span className="text-white font-bold text-[16px]">Pending review requests</span>
                </div>
                <div className="rounded bg-[#8792A8] text-white  p-[16px]">
                    <div className="text-[45px] font-Eina03 font-normal">{data['complete'] ?? 0}</div>
                    <span className="text-white font-bold text-[16px]">Complete projects</span>
                </div>
            </div>
        </div>
    );
}