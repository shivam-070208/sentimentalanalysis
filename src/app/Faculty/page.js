import Dashboard from '@/components/faculty/Dashboard';
import Card from '@/components/layout/Card';
import Dashboardlayout from '@/components/layout/Dashboardlayout'
import {  BarChart, LineChart, PieChart } from 'lucide-react';
import React from 'react'

const page = () => {
const line =<span className = "ml-2"> 10% Needs Improvement</span>
 
  return (
   <Dashboardlayout role={"Faculty"} index={0}>
     
    <Dashboard />
   </Dashboardlayout>
  )
}

export default page
