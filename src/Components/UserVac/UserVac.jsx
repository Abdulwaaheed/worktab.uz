import React from 'react'
import avatar from '../../assets/avatar.svg'
import rating from '../../assets/rate.svg'

const UserVac = ({price, title,releaseDate,username , image}) => {
  return (
    <div>
        <div className="border-2 rounded w-full h-[209px] p-1 flex justify-between">
            <div className="flex flex-col  gap-3 justify-center w-1/2">
                <h3 className="h-[30%]">{title}</h3>
                <div className="flex h-[70%] gap-5 ">
                    <img className='w-[23%] mb-2 object-cover rounded-[50%] ' src={`http://localhost:4040/${image}`} alt="" />
                    <div className="flex gap-2 mt-4 flex-col justify-start  items-start w-[75%] ">
                        <h6>{username}</h6>
                        <h5>Размещено проектов на бирже: 25</h5>
                        <div className="flex gap-4 items-start justify-center">
                            <img src={rating} alt="" />
                            <p>15 отзывов</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-between items-center">
                <div className="">
                    <h5 className='text-green-500'>Бюджет: {price} тенге</h5>
                    <p>{releaseDate}</p>
                </div>
                <h6>Предложений: 65</h6>
            </div>
        </div>
    </div>
  )
}

export default UserVac