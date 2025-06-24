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
const Dashboardlayout = ({children,role}) => {
   
    return (
    <div className='flex flex-col max-w-screen overflow-x-hidden   min-h-screen'>
      
        <header className='w-screen flex justify-between p-4 border-b-1 border-neutral-200 peer'>
    <div className=' md:text-xl text-lg font-[500] ' >
     
        {role} Dashboard

    </div>
        </header>
        <div className='  flex-1 flex   w-screen'>
        <aside className='h-full bg-white w-14 peer-[checked]:'>

        </aside>
        <div className='flex-1 p-6 bg-[#F9FAFB] flex-col flex gap-6'>
            {children}
        </div>
        </div>
    </div>
  )
}

export default Dashboardlayout
