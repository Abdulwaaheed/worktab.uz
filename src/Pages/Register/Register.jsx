import { useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.svg";
import logo from "../../assets/logo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setUser } from "../../rt/slice/user";
import GoogleLogin from "react-google-login";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user || {});
  const [selectedType, setSelectedType] = useState("");
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confPas: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);


  function handleRadioButtonChange(e) {
    setSelectedType(e.target.name);
  }

  async function handleForm(e) {
    e.preventDefault();
    if (!values.name) return toast("Name is required!!! 😡", { type: "error" });
    if (!values.surname)
      return toast("Surname is required!!! 😡", { type: "error" });
    if (!values.phone)
      return toast("Phone is required!!! 😡", { type: "error" });
    if (!values.email)
      return toast("Email is required!!! 😡", { type: "error" });
    if (!values.password)
      return toast("Password is required!!! 😡", { type: "error" });
    if (values.password !== values.confPas)
      return toast(
        "Please check and try again: Wrong confirmation password 😡",
        { type: "error" }
      );

    if (values.email.length < 4)
      return toast("Email must be at least 4 characters long!!! 😡", {
        type: "error",
      });
    if (values.password.length < 4)
      return toast("Password must be at least 4 characters long!!! 😡", {
        type: "error",
      });

    try {
      let { data } = await axios.post("/register", {
        ...values,
        role: selectedType
    });
      console.log(data.data);
      let token = data.data;

      if (!token)
        return toast("Something went wrong! Please contact the developer!!!", {
          type: "error",
        });

      localStorage.setItem("token", token);
      axios.defaults.headers.common["xxx_auth"] = token;
      toast("Logged in Successfully", { type: "success" });
      dispatch(registerUser({ token, user: values }));
      navigate("/");
    } catch (error) {
      console.log(error);
      let message = error.response.data.msg;
      toast(message, { type: "error" });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/google-login', { token: response.token })
      console.log(res.response.data.data);
      setValues(res.response.data.data) 
    } catch (error) {
      toast(error.response.data.msg,{type:"error"})
    }
  };
  return (
    <div className="font-sans">
      <div className="flex justify-between items-center w-full overflow-hidden">
        <div className="w-1/2 flex items-center flex-col justify-center overflow-hidden">
          <img src={logo} className="object-scale-down " alt="" />
          <p className="mr-72 mt-16">Добро пожаловать!</p>
          <h2>Войдите в свой аккаунт</h2>
          <form className="mb-14 w-1/2" onSubmit={handleForm}>
            <div className=""></div>
            <div className="name flex flex-col">
              <label htmlFor="name" className="text-sm">
                Ваше имя
              </label>
              <input
                onChange={handleInputChange}
                value={values.name}
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                className="h-[30px] text-sm font-medium w-full mb-4 border-2 rounded placeholder-slate-500"
              />
            </div>
            <div className="surname flex flex-col">
              <label htmlFor="surname" className="text-sm">
                Ваша фамилия
              </label>
              <input
                onChange={handleInputChange}
                value={values.surname}
                type="text"
                name="surname"
                id="surname"
                placeholder="Фамилия"
                className="h-[30px] text-sm font-medium w-full mb-4 border-2 rounded placeholder-slate-500"
              />
            </div>
            <div className="email flex flex-col">
              <label htmlFor="email" className="text-sm">
                E-mail
              </label>
              <input
                onChange={handleInputChange}
                value={values.email}
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                className="h-[30px] text-sm font-medium w-full mb-4 border-2 rounded placeholder-slate-500"
              />
            </div>
            <div className="phone flex flex-col">
              <label htmlFor="phone" className="text-sm">
                Телефон
              </label>
              <input
                onChange={handleInputChange}
                value={values.phone}
                type="tel"
                name="phone"
                id="phone"
                placeholder="+998xxxxxxxxx"
                className="h-[30px] text-sm font-medium w-full mb-4 border-2 rounded placeholder-slate-500"
              />
            </div>
            <div className="password flex flex-col">
              <label htmlFor="password" className="text-sm">
                Пароль
              </label>
              <input
                onChange={handleInputChange}
                value={values.password}
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className="h-[30px] text-sm font-medium w-full mb-4 border-2 rounded placeholder-slate-500"
              />
            </div>
            <div className="confPas flex flex-col">
              <label htmlFor="confPas" className="text-sm">
                Подтвердите пароль
              </label>
              <input
                onChange={handleInputChange}
                value={values.confPas}
                type="password"
                name="confPas"
                id="confPas"
                placeholder="Подтвердите пароль"
                className="h-[30px] text-sm font-medium w-full mb-4 border-2 rounded placeholder-slate-500"
              />
            </div>
            <div className="mb-3 flex items-center justify-center gap-7">
              <div className="">
              <input
                type="radio"
                name="user"
                id="user"
                className="mr-2"
                checked={selectedType === "user"}
                onChange={handleRadioButtonChange}
              />
              <label htmlFor="user" className="text-sm">Я исполнитель
              </label>
              </div>
              <div className="">
              <input
                type="radio"
                name="recruiter"
                id="recruiter"
                className="mr-2"
                checked={selectedType === "recruiter"}
                onChange={handleRadioButtonChange}
              />
              <label htmlFor="recruiter" className="text-sm">Я заказчик
              </label>
              </div>
            </div>
            <div className="flex flex-col justify-center">
            <button type="submit" className= " mb-4 text-white bg-green-500 px-10 py-2 text-sm rounded font-medium">
              Зарегистрироваться
            </button>
            <GoogleLogin
          clientId="958181561611-18gf812bbui8catfvebv3ncen0cp1unj.apps.googleusercontent.com"
          buttonText="Или войдите с помощью Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          className='w-full h-10 flex items-center justify-center rounded-3xl bg-[#2D3748]'
        />
           <p> Уже есть аккаунт? <Link
              to="/login"
              className="text-orange-500"
            >
              Войти
            </Link></p>
            </div>
          </form>
        </div>
        <div className="w-1/2 overflow-hidden">
          <img className="w-[100%] h-[100vh]" src={loginImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;