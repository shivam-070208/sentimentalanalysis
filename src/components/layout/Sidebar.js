'use client';


import { motion } from 'framer-motion';
import { BarChart, BookOpen, GraduationCap, Home, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';

import React, { useState } from 'react';

const Sidebar = ({ role,index }) => {
  const [expanded, setExpanded] = useState(false);
 

  const normalizedRole = role?.toLowerCase(); // ✅ normalize once
  
  const navItems =
    normalizedRole == 'student'
      ? [
          { icon: <Home size={20} color='blue' />, label: 'Dashboard', path: '/Student/home' },
          { icon: <Users size={20} color='blue' />, label: 'Rate Teachers', path: '/Student/rate' },
          { icon: <MessageSquare size={20} color='blue' />, label: 'Suggestions', path: '/Student/suggestions' },
        ]
      : [
          { icon: <Home size={20} color='blue' />, label: 'Dashboard', path: '/Faculty/home' },
          { icon: <BarChart size={20} color='blue' />, label: 'Analytics', path: '/Faculty/Analytic' },
          { icon: <MessageSquare size={20} color='blue' />, label: 'Suggestions', path: '/Faculty/Suggestions' },
        ];

  return (
    <aside className={`bg-white  sm:static absolute min-h-screen h-full border-r-1 -left-30 border-gray-200 transition-all duration-300 ${expanded ? 'w-60 left-0' : 'w-20'}`}>
        <div onClick={()=>setExpanded(!expanded)} className={` ${expanded ? 'hidden' : null} border-r-2 border-b-2 border-neutral-500 -rotate-45 sm:hidden fixed top-1/2 left-0 w-4 h-4`} />
      <nav className="flex flex-col  py-4">
        <div className="px-4 mb-6 flex items-center justify-center">
          {normalizedRole === 'student' ? (
            <GraduationCap
              color="blue"
              onClick={() => setExpanded(!expanded)}
              className={`h-8 w-8 cursor-pointer ${expanded ? 'mr-3' : 'mx-auto'}`}
            />
          ) : (
            <BookOpen
              onClick={() => setExpanded(!expanded)}
              color="green"
              className={`h-8 w-8 cursor-pointer ${expanded ? 'mr-3' : 'mx-auto'}`}
            />
          )}
          {expanded && <span className="text-lg font-semibold">{normalizedRole === 'student' ? 'Student' : 'Faculty'}</span>}
        </div>

        <div className="space-y-1 px-2 flex-1">
          {navItems.map((item,idx) => (
            <Link href={item.path}
              key={item.label}
              className="flex items-center py-2 px-3 relative cursor-pointer rounded-md w-full hover:bg-gray-100 transition-colors"
             
            >
              {index==idx &&<motion.span layoutId='motion-span' transition={{type:'spring',stiffness:100}} className='absolute top-0 left-0 rounded-md w-full h-full bg-neutral-100 z-0' />}
              <span className={expanded ? 'mr-3 z-1' : 'mx-auto z-1' }>{item.icon}</span>
              {expanded && <span className='z-1'>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
