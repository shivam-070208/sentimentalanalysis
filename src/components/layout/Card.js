
import React from 'react'
import {  Star, Users } from "lucide-react";
const Card = ({item}) => {
    const {tittle,Stars,User,No,Comment} = item
  return (
    <div className='w-full px-5 py-8 flex flex-col gap-2 bg-white rounded-xl hover:shadow-xl transition-all border-1 hover:border-0 border-neutral-200'>
<div className="w-full flex justify-between">
    <span className='text-sm font-semibold'>{tittle}</span>
    {User&&< Users className="h-4 w-4 text-neutral-400" />}
    {Stars &&<Star className="h-4 w-4 text-neutral-400"  />}
</div>
<span className='text-2xl font-bold'>{No}</span>
<span className='text-xs text-zinc-400'>{Comment}</span>
      
    </div>
  )
}

export default Card
