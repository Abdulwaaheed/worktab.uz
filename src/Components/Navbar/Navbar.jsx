import React, { useEffect, useState } from 'react';
import logo from "../../assets/logo.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';
import DropDown from '../DropDown/DropDown';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
const navigate =useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `${token}`,
          },
        });
        
        setUser(response.data.data);
      } catch (error) {
        toast(error.response.data.msg,{type:"error"});
      }
    };
    fetchUser();
  }, []);
//   useEffect(()=>{
//     const token  = localStorage.getItem('token')
//     if(!token) navigate('/login')
// },[])
  return (
    <div className='flex items-center justify-between w-full h-28'>
      <Link to={'/'}><img src={logo} alt="" /></Link>
      <ul className='flex justify-between items-center no-underline w-1/2'>
        <li><Link to={"/exchange"} className='no-underline text-black'>Биржа</Link></li>
        <li><Link to={"#"} className='no-underline text-black'>Ворки</Link></li>
        <li><Link to={"#"} className='no-underline text-black'>Конкурсы</Link></li>
        <li><Link to={"/create-work"} className='no-underline text-black'>Создать ворк</Link></li>
        <li><Link to={"/create-order"} className='no-underline text-black'>Создать заказ</Link></li>
      </ul>
      <div className="flex items-center gap-4 justify-center">
        {user && (
          <div className='flex items-center justify-center gap-3  '>
            <Link className='text-gray-400'><i className="fa-solid fa-star"></i></Link>
            <Link className='text-gray-400'><i className="fa-solid fa-bell"></i></Link>
            <Link className='text-gray-400'><i className="fa-solid fa-comment-dots"></i></Link>
              <span className="text-black">{user.name}</span>
            <img
              src={`http://localhost:4040/${user.image}`}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <DropDown/>
          </div>
        )}
        {!user && (
          <>
            <Link
              to={"/register"}
              className='w-32 flex items-center justify-center no-underline bg-[#f2F0FE] border-green-500 rounded-3xl h-10 text-[#04C35C]'
            >
              Регистрация
            </Link>
            <Link
              to={"/login"}
              className='w-24 h-10 flex items-center justify-center no-underline rounded-3xl text-white bg-[#04C35C]'
            >
              Войти
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;