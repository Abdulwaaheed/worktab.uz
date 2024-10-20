import { Dropdown } from 'flowbite-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const  DropDown = ()=> {
    const navigate = useNavigate()
    function handleLogout() {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["x-auth-token"];
      navigate("/login");
    }
    useEffect(()=>{
        const token  = localStorage.getItem('token')
        if(!token) navigate('/login')
    },[])
  return (
    <Dropdown className='z-10' label="" inline>
      <Dropdown.Item>Мои настройки</Dropdown.Item>
      <Link  to={'/profile'} className='text-inherit no-underline transition-all hover:text-green-500'><Dropdown.Item>Мой кабинет</Dropdown.Item></Link>
      <Dropdown.Item>Мои заказы</Dropdown.Item>
      <Dropdown.Item>История</Dropdown.Item>
      <Dropdown.Item>Мой кошелек</Dropdown.Item>
      <Link onClick={handleLogout} className=' no-underline transition-all hover:text-red-500'><Dropdown.Item>Выйти из аккаунта </Dropdown.Item></Link>
    </Dropdown>
  );
}
export default DropDown