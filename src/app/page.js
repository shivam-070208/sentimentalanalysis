import Container from "@/components/Container"
import Card from "@/components/Mainpage/Card"
import Text from "@/components/Mainpage/Text"
const page = () => {
  return (
    <div className="bg-linear-to-b from-blue-500 to-90% to-blue-800">
         <Container>
      <Text />
      <div className="grid w-full gap-6 grid-cols-1 mt-7 md:grid-cols-2"
      >
        {["Student","Faculty"].map((item)=>(
          <Card key={item} item={item} />
        ))}
      </div>
      
         </Container>
         </div>
  
  )
}

export default page
