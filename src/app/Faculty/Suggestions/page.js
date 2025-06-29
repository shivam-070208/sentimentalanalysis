import Suggestion from "@/components/faculty/Suggestion"
import Dashboardlayout from "@/components/layout/Dashboardlayout"


const page = () => {
  return (
    <Dashboardlayout role={"Faculty"} index={2}>
      <Suggestion />
    </Dashboardlayout>
  )
}

export default page
