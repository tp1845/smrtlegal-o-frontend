'use client';
import Image from "next/image";
import largeLogo from "@/assets/large-logo.svg"
import Link from "next/link"

import { usePathname } from 'next/navigation';

export default function Sidebar({ logout }) {
   const pathname = usePathname();

   const isActivePage = (page) => {
      return pathname.includes(page);
   }

   return (
   <aside id="logo-sidebar" className="fixed flex flex-col top-0 left-0 z-40 w-64 h-screen px-[33px] py-[41px] bg-[#212936] transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
      <Link href="/" className="block mb-[48px]">
         <Image src={largeLogo} width="180px" height="40" alt="logo" style={{ filter: 'grayscale(100%) brightness(200%)' }} />
      </Link>
      <div className="overflow-y-auto bg-[#212936]">
         <ul className="space-y-2 font-Eina03 ">
            <li>
               <Link href="/dashboard" className={`flex items-center p-2  rounded-lg ${isActivePage('dashboard') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('dashboard') ? `#fff` : `#f0f6ff80`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                     <g clipPath="url(#clip0_49_15897)">
                        <path d="M6.42913 1.58716H2.14342C1.35444 1.58716 0.714844 2.22675 0.714844 3.01573V7.30144C0.714844 8.09042 1.35444 8.73002 2.14342 8.73002H6.42913C7.21811 8.73002 7.8577 8.09042 7.8577 7.30144V3.01573C7.8577 2.22675 7.21811 1.58716 6.42913 1.58716Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.8569 1.58716H13.5711C12.7822 1.58716 12.1426 2.22675 12.1426 3.01573V7.30144C12.1426 8.09042 12.7822 8.73002 13.5711 8.73002H17.8569C18.6458 8.73002 19.2854 8.09042 19.2854 7.30144V3.01573C19.2854 2.22675 18.6458 1.58716 17.8569 1.58716Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.42913 13.0156H2.14342C1.35444 13.0156 0.714844 13.6552 0.714844 14.4442V18.7299C0.714844 19.5189 1.35444 20.1585 2.14342 20.1585H6.42913C7.21811 20.1585 7.8577 19.5189 7.8577 18.7299V14.4442C7.8577 13.6552 7.21811 13.0156 6.42913 13.0156Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.8569 13.0156H13.5711C12.7822 13.0156 12.1426 13.6552 12.1426 14.4442V18.7299C12.1426 19.5189 12.7822 20.1585 13.5711 20.1585H17.8569C18.6458 20.1585 19.2854 19.5189 19.2854 18.7299V14.4442C19.2854 13.6552 18.6458 13.0156 17.8569 13.0156Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     </g>
                     <defs>
                        <clipPath id="clip0_49_15897">
                           <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(0 0.872803)" />
                        </clipPath>
                     </defs>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
               </Link>
            </li>
            <li>
               <Link href="/my-documents" className={`flex items-center p-2  rounded-lg ${isActivePage('my-documents') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('my-documents') ? `#fff` : `#f0f6ff80`} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M19.2863 7.4442C19.2863 6.87588 19.0605 6.33083 18.6586 5.92897C18.2568 5.5271 17.7117 5.30134 17.1434 5.30134H10.0006L7.94342 1.01562H2.8577C2.28938 1.01563 1.74434 1.24139 1.34247 1.64325C0.940608 2.04512 0.714844 2.59016 0.714844 3.15848V14.5871C0.714844 15.1554 0.940608 15.7004 1.34247 16.1023C1.74434 16.5041 2.28938 16.7299 2.8577 16.7299H17.1434C17.7117 16.7299 18.2568 16.5041 18.6586 16.1023C19.0605 15.7004 19.2863 15.1554 19.2863 14.5871V7.4442Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">My Documents</span>
               </Link>
            </li>
            <li>
               <Link href="/new-project" className={`flex items-center p-2  rounded-lg ${isActivePage('new-project') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('new-project') ? `#fff` : `#f0f6ff80`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g clipPath="url(#clip0_49_11467)">
                        <path d="M16.4297 1.58716H17.8583C18.2371 1.58716 18.6005 1.73767 18.8684 2.00558C19.1363 2.27349 19.2868 2.63685 19.2868 3.01573V4.4443" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M0.714844 4.4443V3.01573C0.714844 2.63685 0.865354 2.27349 1.13326 2.00558C1.40117 1.73767 1.76453 1.58716 2.14342 1.58716H3.57199" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.85742 1.58716H12.1431" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.2871 8.72998V12.6586" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M0.714844 8.72998V13.0157" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M0.714844 17.3015V18.7301C0.714844 19.109 0.865354 19.4723 1.13326 19.7402C1.40117 20.0081 1.76453 20.1587 2.14342 20.1587H3.57199" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.85742 20.1587H11.786" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.4297 17.3015C14.1911 17.3015 16.4297 15.0629 16.4297 12.3015C16.4297 9.54009 14.1911 7.30151 11.4297 7.30151C8.66826 7.30151 6.42969 9.54009 6.42969 12.3015C6.42969 15.0629 8.66826 17.3015 11.4297 17.3015Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.957 15.8301L18.5713 19.4444" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     </g>
                     <defs>
                        <clipPath id="clip0_49_11467">
                           <rect width="20" height="20" fill="white" transform="translate(0 0.872803)" />
                        </clipPath>
                     </defs>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">New Project</span>
               </Link>
            </li>
            <li>
               <Link href="/active-projects" className={`flex items-center p-2 rounded-lg ${isActivePage('active-projects') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('active-projects') ? `#fff` : `#f0f6ff80`} width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M19.2863 7.4442C19.2863 6.87588 19.0605 6.33083 18.6586 5.92897C18.2568 5.5271 17.7117 5.30134 17.1434 5.30134H10.0006L7.94342 1.01562H2.8577C2.28938 1.01563 1.74434 1.24139 1.34247 1.64325C0.940608 2.04512 0.714844 2.59016 0.714844 3.15848V14.5871C0.714844 15.1554 0.940608 15.7004 1.34247 16.1023C1.74434 16.5041 2.28938 16.7299 2.8577 16.7299H17.1434C17.7117 16.7299 18.2568 16.5041 18.6586 16.1023C19.0605 15.7004 19.2863 15.1554 19.2863 14.5871V7.4442Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Active Projects</span>
               </Link>
            </li>
            <li>
               <Link href="/archived-projects" className={`flex items-center p-2 rounded-lg ${isActivePage('archived-projects') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('archived-projects') ? `#fff` : `#f0f6ff80`} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M2.14258 6.78711H17.8569V16.7871C17.8569 17.166 17.7064 17.5294 17.4384 17.7973C17.1705 18.0652 16.8072 18.2157 16.4283 18.2157H3.57115C3.19227 18.2157 2.82891 18.0652 2.561 17.7973C2.29309 17.5294 2.14258 17.166 2.14258 16.7871V6.78711Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M19.2871 5.35847V2.50133C19.2871 1.71235 18.6475 1.07275 17.8585 1.07275L2.14425 1.07275C1.35527 1.07275 0.715679 1.71235 0.715679 2.50133V5.35847C0.715679 6.14745 1.35527 6.78704 2.14425 6.78704L17.8585 6.78704C18.6475 6.78704 19.2871 6.14745 19.2871 5.35847Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M7.85742 11.0728H12.1431" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Archived Projects</span>
               </Link>
            </li>
            <li>
               <Link href="/my-account" className={`flex items-center p-2 rounded-lg ${isActivePage('my-account') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('my-account') ? `#fff` : `#f0f6ff80`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10.0011 12.3015C11.9736 12.3015 13.5725 10.7026 13.5725 8.73012C13.5725 6.75767 11.9736 5.15869 10.0011 5.15869C8.02867 5.15869 6.42969 6.75767 6.42969 8.73012C6.42969 10.7026 8.02867 12.3015 10.0011 12.3015Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M3.90039 17.8729C4.53788 16.8265 5.43383 15.9617 6.50211 15.3616C7.5704 14.7615 8.77509 14.4463 10.0004 14.4463C11.2257 14.4463 12.4304 14.7615 13.4987 15.3616C14.567 15.9617 15.4629 16.8265 16.1004 17.8729" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M10.0006 20.1586C15.1289 20.1586 19.2863 16.0012 19.2863 10.8729C19.2863 5.74451 15.1289 1.58716 10.0006 1.58716C4.8722 1.58716 0.714844 5.74451 0.714844 10.8729C0.714844 16.0012 4.8722 20.1586 10.0006 20.1586Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">My account</span>
               </Link>
            </li>
            <li>
               <Link href="/help" className={`flex items-center p-2 rounded-lg ${isActivePage('help') ? 'text-[#fff]' : 'text-[#f0f6ff80]'} hover:bg-gray-100 hover:bg-gray-700`}>
                  <svg stroke={isActivePage('help') ? `#fff` : `#f0f6ff80`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10.0006 20.1586C15.1289 20.1586 19.2863 16.0012 19.2863 10.8729C19.2863 5.74451 15.1289 1.58716 10.0006 1.58716C4.8722 1.58716 0.714844 5.74451 0.714844 10.8729C0.714844 16.0012 4.8722 20.1586 10.0006 20.1586Z" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M7.85742 8.73002C7.85742 8.3062 7.9831 7.8919 8.21856 7.53951C8.45402 7.18712 8.78869 6.91246 9.18024 6.75027C9.5718 6.58809 10.0027 6.54565 10.4183 6.62833C10.834 6.71102 11.2158 6.9151 11.5155 7.21479C11.8152 7.51447 12.0193 7.89629 12.102 8.31197C12.1846 8.72764 12.1422 9.1585 11.98 9.55005C11.8178 9.94161 11.5432 10.2763 11.1908 10.5117C10.8384 10.7472 10.4241 10.8729 10.0003 10.8729V12.3014" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M10.0011 14.4443C9.78921 14.4443 9.58206 14.5072 9.40586 14.6249C9.22967 14.7426 9.09234 14.91 9.01125 15.1057C8.93015 15.3015 8.90893 15.517 8.95028 15.7248C8.99162 15.9326 9.09366 16.1235 9.2435 16.2734C9.39334 16.4232 9.58425 16.5253 9.79209 16.5666C9.99993 16.6079 10.2154 16.5867 10.4111 16.5056C10.6069 16.4245 10.7742 16.2872 10.892 16.111C11.0097 15.9348 11.0725 15.7277 11.0725 15.5158C11.0688 15.2328 10.9548 14.9624 10.7546 14.7622C10.5545 14.5621 10.2841 14.448 10.0011 14.4443Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Help</span>
               </Link>
            </li>
         </ul>
      </div>

      <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="flex mt-auto items-center p-2 rounded-lg text-[#f0f6ff80] hover:bg-gray-100 hover:bg-gray-700">
         <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
               <path d="M16.6663 15.7334L20.3996 12.0001M20.3996 12.0001L16.6663 8.26678M20.3996 12.0001L7.33294 12.0001M12.9329 15.7334V16.6668C12.9329 18.2132 11.6793 19.4668 10.1329 19.4668H6.39961C4.85321 19.4668 3.59961 18.2132 3.59961 16.6668V7.33345C3.59961 5.78705 4.85321 4.53345 6.39961 4.53345H10.1329C11.6793 4.53345 12.9329 5.78705 12.9329 7.33345V8.26678" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
         </svg>
      </a>
   </aside>);
}