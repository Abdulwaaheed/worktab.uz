import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#F2F0FE]'>
        <div className="flex justify-between items-start mt-9  container p-4">
            <div className="flex flex-col justify-start items-end">
                <h4 className='mb-4'>Топ категории</h4>
                <ul>
                    <li>Тексты и переводы</li>
                    <li>Разработка</li>
                    <li>Дизайн</li>
                    <li>Аудио, видео монтаж</li>
                    <li>Соцсети и реклама</li>
                    <li>Бизнес и жизнь</li>
                    <li>SEO и оптимизация</li>
                </ul>
            </div>
            <div className="flex flex-col justify-start items-center ">
                <h4 className='mr-6 mb-4'>О Проекте</h4>
                <ul>
                    <li>О Нас</li>
                    <li>Как Это Работает</li>
                    <li>Политика Приватности</li>
                    <li>Правила Пользования </li>
                    <li>Пресса о нас</li>
                </ul>
            </div>
            <div className="flex flex-col justify-start items-center">
                <h4 className='mr-4 mb-4'>Поддержка</h4>
                <ul>
                    <li>Контакты</li>
                    <li>Политика Безопасности</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div className="flex flex-col justify-start items-start ">
                <h4 className='mb-4'>Follow</h4>
                <div className="flex gap-3 items-center justify-center">
                <i className="fa-brands fa-facebook text-4xl "></i>
                <i className="fa-brands fa-twitter text-4xl"></i>
                <i className="fa-brands fa-square-instagram text-4xl"></i>
                <i className="fa-brands fa-linkedin text-4xl"></i>
                </div>
            </div>
        </div>
        <div className="flex gap-3 items-center justify-center">
        <p>Copyright @ 2024  |  WorkTap – Worktap.UZ. All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer