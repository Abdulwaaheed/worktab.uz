import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/login.svg'
import logo from '../../assets/logo.svg'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {
    const navigate =  useNavigate()
    const [values, setValues] = useState({ email: "", password: "" })
    useEffect(() => {
        let token = localStorage.getItem("token")
        if(token) navigate('/')

    }, [navigate]);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      
      axios.get("/profile")
        .then(res => {
          const data = res.data.msg;
          toast(data, { type: "error" });
        })
        .catch(error => {
          console.error('Foydalanuvchi ma\'lumotini olishda xato yuz berdi', error);
        });
    }, []);
    async function handleForm(e){
      e.preventDefault()
      if (!values.email)
      return toast("Email is required!!! 😡", { type: "error" });

    if (!values.password)
      return toast("Password is required!!! 😡", { type: "error" });

    if (values.email.length < 4)
      return toast("Email must be at least 4 character long!!! 😡", {
        type: "error",
      });

    if (values.password.length < 4)
      return toast("Password must be at least 4 character long!!! 😡", {
        type: "error",
      });

    try {
      let {data} = await axios.post("/login", values)
      let  token  = data.data;

      if (!token)
        return toast("Something went wrong! Please contact developer!!!", {
          type: "error",
        });

      localStorage.setItem("token", token);
      axios.defaults.headers.common["xxx_auth"] = token;
      toast("Logged in Successfully", { type: "success" });
      navigate("/");

    } catch (error) {
      let message = error.response.data.msg;
      toast(message, { type: "error" });
    }
    }
    function handleInputChange(e) {
      setValues((ov) => ({ ...ov, [e.target.name]: e.target.value }));

    }

  return (
    <div className=''>
      <div className=" flex  justify-between items-center w-full ">
      <div className='w-1/2 flex items-center flex-col justify-normal'>
        <img src={logo} className='object-scale-down  mb-16' alt="" />
         <p className='mr-72 mt-16'>Добро пожаловать!</p>
          <h2>Войдите в свой аккаунт</h2>
        <form className='mb-14' onSubmit={handleForm}>
         <div className="">
         </div>
         <div className="email flex flex-col">
         <label htmlFor="email">E-mail</label>
        <input onChange={handleInputChange} value={values.email} type="email" name="email" id="email"  placeholder='E-mail' className='w-full mb-10 border-2 rounded placeholder-slate-500 p-2'/>
         </div>
         <div className="pass  flex flex-col">
         <label htmlFor="pass">Пароль</label>
         <input onChange={handleInputChange} value={values.password} type="password" name="password" id="pass" placeholder='Пароль' className='w-full border-2 rounded placeholder-slate-500 p-2' />
         </div>
         <div className="radio mt-4 flex justify-between">
          <label htmlFor="radio"><input type="radio" name="radio" id="radio" className='mx-2 ' />Запомнить меня </label>
          <Link to={'#'} className='text-rose-300'>Забыли пароль?</Link>
         </div>
         <button className='w-full h-10 rounded-3xl text-white bg-[#04C35C] mb-3 mt-5'>Войти</button>
         <button className='w-full h-10 flex items-center justify-center rounded-3xl text-white bg-[#2D3748]'><img width="28" height="28" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> Или войдите с помощю Google</button>
         <p className='mt-5'>У Ваc все еще нет аккауна? <Link className='text-rose-300' to={'/register'}> Зарегистрируйтесь бесплатно!</Link></p>
      </form>
      </div>

        <div className='w-1/2'>
          <img src={loginImg} className='h-[100vh] w-screen' alt="" />
        </div>

      </div>
    </div>
  )
}

export default Login