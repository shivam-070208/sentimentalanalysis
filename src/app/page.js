"use client"
import Container from "@/components/Container"
import Card from "@/components/Mainpage/Card"
import Text from "@/components/Mainpage/Text"
import { useState } from "react"
import Form from "@/components/Mainpage/Form"
const page = () => {
  const [board,sboard] = useState(null)
  return (
    <div className="bg-linear-to-b from-blue-500 to-90% to-blue-800">
         <Container>
      <Text />
      {!board &&<div className="grid w-full gap-6 grid-cols-1 mt-7 md:grid-cols-2"
      >
        {["Student","Faculty"].map((item)=>(
          <Card key={item} sboard={sboard} item={item} />
        ))}
      </div>}
        {board&& <Form board={board} />}
      <footer className="text-white  m-auto mt-20">© 2025 Faculty Feedback System. All rights reserved.</footer>
         </Container>
         </div>
  
  )
}

export default page
