export default function ToDoSection({ data }) {
    const statuses = {
        completed: 'border-[#75DD7F] bg-[#75DD7F]',
        error: 'border-[#DD5456] bg-[#FBE3E2]',
        panding: 'border-[#75DD7F] bg-[#E5FFE8]',
    }

    return (
        <div className="relative p-5 border rounded-lg mb-3">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-[14px] text-[#222] mb-3">{ data.title }</h3>
                <span className={`w-4 h-4 rounded-full border bg-[#75DD7F] ${statuses[data.status]}`}></span>
            </div>
            <p className="text-[12px]" dangerouslySetInnerHTML={{__html: data.message}}></p>
            <div className="flex">
                <span className="ml-auto text-[12px] text-[#737373]">{ data.created_at }</span>
            </div>
        </div>
    );
}