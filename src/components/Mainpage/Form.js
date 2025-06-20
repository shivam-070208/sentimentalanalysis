import { motion } from 'framer-motion'
import React, { useState } from 'react'

const Form = ({board}) => {
    const [index,sindex] = useState(0)
    const Data={
      'Login': [
        {
            "Name":"Email",
            "Placeholder":"you@gmail.com"
        } ,{
        "Name":"Password",
        "Placeholder":"Enter your password" ,
        "Forgot":true
        }
      ]
    }
  return (
    <div className='w-full max-w-lg m-auto bg-white flex mt-4 rounded flex-col py-3 px-2 items-center'>
      <h1 className='text-2xl font-semibold'>{board} Access</h1>
      <p className='text-zinc-400 text-sm '>Login or create a new account</p>
      <div className='px-2 py-1 rounded bg-zinc-100 flex mt-7 w-full text-center'>
        {['Login','Signup'].map((item,i)=>(
            <div onClick={()=>sindex(i)} key={i} className={`text-center z-1 w-1/2 relative text-sm ${index == i?'text-black':'text-zinc-500'} cursor-pointer font-semibold py-2`}>{item}
            {i==index && <motion.div layoutId='movable-span' initial={{width:'100%',height:'100%'}} className='absolute top-0 left-0 -z-1 rounded bg-white' />}</div>
        ))}
      </div>
    </div>
  )
}

export default Form
