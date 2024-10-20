import React from 'react'
import { Link } from 'react-router-dom'
import showcase from '../../assets/showcases.svg'


const Showcase = () => {
  return (
    <div>
        <div className="h-[85vh] w-full flex">
            <div className="w-1/2 flex flex-col gap-5 ">
                <h1 className='mt-5'>Покупайте фриланс-услуги <br /> в <span className='text-green-400'>два клика</span></h1>
                <p>Ворк — единица работы продавца, которую <br /> можно купить как товар в магазине </p>
               <form className='flex items-center'>
                <input className=' ps-3 h-9 w-80 rounded-l-2xl' type="text" id='search' name='search' placeholder='Что нужно сделать?'/>
                <button className='w-[100px] bg-orange-400 h-9 rounded-r-2xl text-white'>Найти</button>
               </form>
               <p>Выберите рубрику, чтобы начать</p>
                <div className="grid grid-cols-3 grid-rows-3 gap-4 ">
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 w-36 rounded text-center no-underline text-black bg-[#f0ffff]'>Дизайн</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 w-36 rounded text-center no-underline text-black bg-[#f0ffff]'>Дизайн сайтов</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green w-36 rounded text-center no-underline text-black bg-[#f0ffff]'>Дизайн логотипа</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 w-36 rounded text-center no-underline text-black bg-[#f0ffff]'>Дизайн визиток</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-black bg-[#f0ffff]'>Арт и иллюстрации</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-black bg-[#f0ffff]'>Флаера и брошюры</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-black bg-[#f0ffff]'>Баннеры и стенды</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-black bg-[#f0ffff]'>Дизайн презентации</Link>
                    <Link className='border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-black bg-[#f0ffff]'>Все подкатегории</Link>
                </div>
            </div>
            <div className="relative">
              <img className='' src={showcase} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Showcase