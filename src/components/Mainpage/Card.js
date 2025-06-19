import React from 'react'
import { Svg } from './Svg'

const Card = ({item}) => {
  return (
    <div className='w-full bg-white rounded pb-10 overflow-hidden h-full flex items-center  flex-col'>
      <div className={`${item=="Student"?'bg-blue-800':'bg-green-600'} w-full rounded-tmd h-2 mb-5`}></div>
      <Svg item={item} />
      <p className='text-2xl font-semibold mt-4'>{item}</p>
      <p className='text-zinc-400 text-sm mt-2'>{item=="Student"?'Rate your teachers and provide anonymous feedback':'View analytics and insights from student feedback'}</p>
       <p className='text-black mt-5'>{item=="Student"?'Share your experiences to help improve education quality':'Analyze feedback data to enhance your teaching approach'}</p>
       <button  className={`${item=="Student"?'bg-blue-700':'bg-green-600'} cursor-pointer w-fit mt-14 text-white text-md px-9 py-2 rounded-sm`}>Continue as {item}</button>
    </div>
  )
}

export default Card
