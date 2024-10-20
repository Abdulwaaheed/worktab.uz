import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Showcase from "../../Components/Showcase/Showcase";
import Main from "../../Components/Main/Main";
import card from "../../assets/card.svg";
import clock from "../../assets/clock.svg";
import money from "../../assets/money.svg";
import bgImg from "./home.module.css";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="bg-[#F7F6FF]">
      <div className="container  md:mx-auto">
        <Navbar />
        <Showcase />
        <Main />
      </div>
      <div className={`${bgImg.imgB} w-full h-[600px]`}>
        <div className=" flex flex-col ms-28 justify-center h-full gap-12">
          <h1 className="text-white">Как WorkTap помогает бизнесу?</h1>
          <div className="flex flex-col gap-4">
            <div className="w-[530px] h-16 ps-4 bg-white flex items-center justify-start gap-3 rounded-xl">
              <img src={card} alt="" />
              <p className="pt-3">Оплачивайте с р/с или карты компании</p>
            </div>
            <div className="w-[530px] h-16 ps-4 bg-white flex items-center justify-start gap-3 rounded-xl">
              <img src={money} alt="" />
              <p className="pt-3">Экономьте до 87% бюджета на фрилансе</p>
            </div>
            <div className="w-[530px] h-16 ps-4 bg-white flex items-center justify-start gap-3 rounded-xl">
              <img src={clock} alt="" />
              <p className="pt-3">
                Экономьте до 75% времени на решении фриланс задач
              </p>
            </div>
          </div>
          <p className="text-white">WorkTap — быстро, просто и безопасно!</p>
          <button className=" text-white w-36 h-10 rounded-3xl bg-[#5E4EDB]">
            Начать!
          </button>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
