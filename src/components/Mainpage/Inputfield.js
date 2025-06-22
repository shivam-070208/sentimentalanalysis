import React, { useEffect } from 'react'

const Inputfield = ({data}) => {
    useEffect(()=>{
        console.log(data);
        
    },[])
  return (
    <div className='w-full'>
      <label className='w-full flex justify-between text-sm mb-3' ><span className='font-semibold'>{data.Label}</span>{data.forgot && <span className='text-blue-500 hover:underline cursor-pointer'>Forgot password?</span>}</label>
      {(!(data.Label=='Section'||data.Label=='Department')) &&<input name={data.Label} type={data.Label.split(' ')[1]??data.Label.split(' ')[0]} className='w-[98%] px-3  outline-blue-700 focus:outline-2 py-2  rounded border-1 border-[#8f8d8d6d] text-sm ' placeholder={data.Placeholder} />}
      {(data.Label=='Section'||data.Label=='Department') &&(
        <select name={data.Label} className='w-[98%] px-1 py-3 text-sm outline-blue-700  focus:outline-2 rounded border-1 border-[#8f8d8d6d]' >
            <option value={null} className='rounded ' default>{data.Placeholder}</option>
            {data.Option.map((item)=>(
                <option value={item} key={item} className='rounded '>{item}</option>
                
            ))}
        </select>
      )}
    </div>
  )
}

export default Inputfield
