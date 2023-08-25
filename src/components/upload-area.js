import { useEffect, useState } from "react";

export default function UploadArea({ onUpload, reset, uploadedfile }) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    const handleUpload = (event) => {
        const [file] = event.target.files;
        setUploading(true)
        setProgress(100)
        setFile(file)
        console.log("file:" + file);
        console.log(file);
        setTimeout(() => {
            // setUploading(false)
            onUpload(file)
        }, 1000)
    }

    const handleReset = () => {
        setProgress(0)
        setUploading(false)
        setFile(null)
        onUpload(null)
    }

    useEffect(() => {
      if (reset) {
        console.log("reset...");
        handleReset();
      }
    }, [reset]);
    useEffect(() => {
        if (uploadedfile) {
            console.log('uploaded:');
            console.log(uploadedfile);
            setUploading(true)
            setProgress(100)
            setFile(uploadedfile);
        }
      }, []);

    return (
            <>
                <div className="flex overflow-hidden relative flex-col p-[20px] items-center jusitfy-cneter bg-[#F7FAFF] border-dashed border border-[#E5E5E5] rounded-[6px]">
                    {
                    ! uploading && ! file ? (
                        <>
                        <svg className="mb-[18px]" width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.27795 24.2001H16.7224C18.097 24.2001 19.2113 23.0857 19.2113 21.7112V9.78218C19.2113 9.45213 19.0802 9.13561 18.8468 8.90223L12.1091 2.16454C11.8757 1.93116 11.5592 1.80005 11.2292 1.80005H4.27795C2.90338 1.80005 1.78906 2.91436 1.78906 4.28894V21.7112C1.78906 23.0857 2.90338 24.2001 4.27795 24.2001Z" fill="#F7FAFF"/>
                                <path d="M6.76684 14.2445H14.2335M10.5002 10.5112L10.5002 17.9778M16.7224 24.2H4.27795C2.90338 24.2 1.78906 23.0857 1.78906 21.7112V4.28894C1.78906 2.91436 2.90338 1.80005 4.27795 1.80005H11.2292C11.5592 1.80005 11.8757 1.93116 12.1091 2.16454L18.8468 8.90223C19.0802 9.13561 19.2113 9.45213 19.2113 9.78218V21.7112C19.2113 23.0857 18.097 24.2 16.7224 24.2Z" stroke="#4ECFE0" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h3 className="text-[#212936] text-[14px] font-bold">Click to upload or drag and drop</h3>
                            <p className="text-[#777E86] text-[12px]">Maximum file size 50MB</p>
                            <input 
                                className="opacity-0 absolute left-0 top-0 text-[70rem]"
                                type="file"
                                onChange={handleUpload}
                                accept="text/*, .doc, .docx, application/msword"
                                style={{ cursor: 'pointer' }}
                            /></>
                    )
                        :<></>
                }
                {
                        uploading ? (
                            <>
                                <h3 className="text-[#171717] text-[14px] font-bold">{progress == 100 ? 'Uploaded' : 'Uploading'} File</h3>
                                <p className="text-[#737373] text-[12px]">{Math.round((file.size / 1024) * 100) / 100} KB</p>
                                <div className="flex items-center">
                                    <span className="mr-[16px] text-[#A3A3A3] text-[16px] font-bold font-Eina03">{progress}%</span>
                                    <div className="border-b-[6px] border-b-[#CCFFFA] w-[200px] relative z-[1]">
                                        <div style={{width: `${progress}%`}} className="bg-[#4ECFE0] h-[6px] absolute left-0 top-0 z-[2]"></div>
                                    </div>
                                    <a href="#" className="ml-[16px]" onClick={(e) => {e.preventDefault(); handleReset(); }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.1329 13.8668L11.9996 12.0001M11.9996 12.0001L13.8663 10.1334M11.9996 12.0001L10.1329 10.1334M11.9996 12.0001L13.8663 13.8668M20.3996 12.0001C20.3996 16.6393 16.6388 20.4001 11.9996 20.4001C7.36042 20.4001 3.59961 16.6393 3.59961 12.0001C3.59961 7.36091 7.36042 3.6001 11.9996 3.6001C16.6388 3.6001 20.3996 7.36091 20.3996 12.0001Z" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>
                            </>
                        ) : <></>
                    }
                </div> 
                
            </>    
        );
}