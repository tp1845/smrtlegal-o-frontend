import Image from "next/image";
import largeLogo from "@/assets/large-logo.svg"
import Notifications from "@/components/notifications";
import ChangeRole from "@/components/change-role";
import { useState } from "react";

export default function navbar({ user, roles, logout }) {

  return (<nav className="fixed top-0 z-40 w-full bg-[#F5F5F5] border-b border-gray-200 ">
    <div className="px-[20px] py-[20px] lg:px-5 lg:pl-3 lg:ml-64 ml-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <div className="grid grid-cols-[70px_1fr] gap-[25px]">
            <Notifications user={user} />
            <div className="flex items-center leading-4">
              <div className="mr-[10px] text-Eina03">
                <h4 className="text-[16px] text-[#141522] m-0 p-0 font-bold">{user.lname && user.fname ? user.fname + ' ' + user.lname : user.email}</h4>
                <div className="ml-auto text-right">
                  <ChangeRole
                    className="text-[12px] text-[#54577A] m-0 p-0"
                    roles={roles}
                    user={user}
                  />
                </div>
              </div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <div className="w-8 h-8 rounded-full">
                  {
                    user.avatar ?
                      <img className="w-full h-full object-contain rounded-full" src={user.avatar} alt="avatar" />
                      : <></>
                  }
                </div>
              </button>
            </div>
            {/* <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow bg-gray-700 divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 text-white" role="none">
                    Neil Sims
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate text-gray-300" role="none">
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Sign out</a>
                  </li>
                </ul>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  </nav>);
}