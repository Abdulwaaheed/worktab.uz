import React from 'react'

const Card = ({description,title,image}) => {
  return (
    <div className='border w-[400px] h-min-[270px] p-2'> 
        <div className="w-[85%] flex">
            <img className='w-[120px] rounded-full' src={`http://localhost:4040/${image}`} alt="" />
            <h4 className='ml-7'>{title}</h4>
        </div>
        <p className='mt-3'>{description}</p>
        <button className='w-full  rounded-2xl border-1 border-green-500 text-green-500 transition-all hover:transition-all hover:bg-green-500 hover:text-white'>Посмотреть</button>
    </div>
  )
}

export default Card