import Analytics from '@/components/faculty/Analytics'
import Dashboardlayout from '@/components/layout/Dashboardlayout'
import React from 'react'

const page = () => {
  return (
    <Dashboardlayout role={"Faculty"} index={1}>
      <Analytics />
    </Dashboardlayout>
  )
}

export default page
