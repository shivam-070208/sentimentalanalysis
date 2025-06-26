import Dashboard from '@/components/facultyhome/Dashboard';
import Card from '@/components/layout/Card';
import Dashboardlayout from '@/components/layout/Dashboardlayout'
import {  BarChart, LineChart, PieChart } from 'lucide-react';
import React from 'react'

const page = () => {
const line =<span className = "ml-2"> 10% Needs Improvement</span>
  const cardData = [
    {
      tittle: "Overall Rating",
      Icon: < LineChart className="h-4 w-4 text-neutral-400" />,
      No: "4.2/5.0",
      Comment: "Based on 120 student feedbacks",
    },
    {
      tittle: "Sentiment Analysis",
      Icon: < PieChart className="h-4 w-4 text-neutral-400" />,
      No: "65%",
     Comment: (
      <>
        25% Neutral <span className="ml-2">10% Needs Improvement</span>
      </>
    ),
    },
    {
      tittle: "Total Suggestions",
      Icon: < BarChart className="h-4 w-4 text-neutral-400" />,
      No: 48,
      Comment: "11 new since last month",
    },
  ];
  return (
   <Dashboardlayout role={"Faculty"} index={0}>
      <div className="w-full flex justify-between flex-wrap">
        <span className="w-fit whitespace-nowrap text-2xl font-bold">
          Welcome Back, Student!
        </span>
        <div className="flex gap-3 flex-wrap justify-center">
          <button className="hover:shadow-md shadow-neutral-600 hover:px-4 transition-all duration-400  rounded px-3 py-1 gap-2 flex bg-blue-600 hover:bg-blue-500 cursor-pointer text-white  items-center">
            <span className=""><BarChart className='w-5 h-5' /> </span>
            <span className="text-sm font-semibold">View Analytics</span>
          </button>
          <button className="hover:shadow-md  shadow-neutral-600 hover:px-4 transition-all duration-400  rounded px-3 py-2   bg-white border-1 border-neutral-300 text-sm cursor-pointer font-semibold hover:bg-green-500 hover:text-white">
            View All Feedback
          </button>
        </div>
      </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-7 ">
        {cardData.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
    <Dashboard />
   </Dashboardlayout>
  )
}

export default page
