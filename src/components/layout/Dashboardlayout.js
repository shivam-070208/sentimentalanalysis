import React from 'react'
import {

  BookOpen, 
  ChevronDown,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users
} from "lucide-react";
import Sidebar from './Sidebar';
import Usercheck from './Usercheck';
const Dashboardlayout = ({children,role,index}) => {
   
    return (
    <div className='flex flex-col max-w-screen overflow-x-hidden   min-h-screen'>
      <Usercheck role={role} />
        <header className='w-screen flex justify-between p-4 border-b-1 border-neutral-200 peer'>
    <div className=' md:text-xl text-lg font-[500] ' >
     
        {role} Dashboard

    </div>
        </header>
        <div className='  flex-1 flex relative   w-screen'>
       <Sidebar role={role} index={index} />
        <div className='flex-1 md:p-6  bg-[#F9FAFB] flex-col flex gap-6 max-w-screen flex-wrap'>
            {children}
        </div>
        </div>
    </div>
  )
}

export default Dashboardlayout
