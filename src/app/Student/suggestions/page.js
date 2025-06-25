import Dashboardlayout from '@/components/layout/Dashboardlayout'
import SuggestionForm from '@/components/Suggestion/Suggestionform'
import React from 'react'

const page = () => {
  return (
   <Dashboardlayout role={"Student"} index={2}>
    <SuggestionForm />
   </Dashboardlayout>
  )
}

export default page
