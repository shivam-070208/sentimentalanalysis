import Dashboardlayout from '@/components/layout/Dashboardlayout'
import TeacherEvaluation from '@/components/RateStudent/Rate'
import React from 'react'

const page = () => {
  return (
 <Dashboardlayout role="Student" index={1}>
<TeacherEvaluation />
 </Dashboardlayout>
  )
}

export default page
