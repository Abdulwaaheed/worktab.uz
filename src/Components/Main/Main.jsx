import React from "react";
import Card from "../Card/Card";
import User from "../User/User";
import uslug from "../../assets/uslug.svg";
import result from "../../assets/result.svg";
import withdraw from "../../assets/withdraw.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Main = () => {
  const [userData, setUserData] = useState({ isFetched: false, data: [] });
  const [work, setWork] = useState({ isFetched: false, data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users");
        const info = await axios.get("/works");

        const workData = info.data.data.works;
        const data = response.data.data.users;

        setUserData({ isFetched: true, data: data });
        setWork({ isFetched: true, data: workData });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-[120px] ">
      <div className="work min-h-[700px]">
        <h2 className="mb-5">Актуальные ворки</h2>
        <div className="grid grid-cols-3 gap-4">
          {work.isFetched && Array.isArray(work.data) ? (
            work.data.map((work) => (
              <Card key={work._id} image={work.image} description={work.description} title={work.title} />
            ))
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="user min-h-[700px] mt-14">
        <h4 className="mb-5">Топ фрилансеров</h4>
        <div className="grid grid-cols-3 gap-4">
          {userData.isFetched && Array.isArray(userData.data) ? (
            userData.data.map((user) => (
              <User
                username={user.name}
                skill={user.skill.slice(0,2)}
                image={``}
                key={user._id}
              />
            ))
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
      </div>

      <div className="question">
        <div className="">
          <h1 className="mb-6">Как решать задачи на WorkTap?</h1>
          <p>Идеально подходит для бизнеса и частных лиц</p>
        </div>
        <div className=" flex justify-between items-center min-h-[400px] mt-6">
          <div className=" flex flex-col gap-2 justify-center items-start">
            <img src={uslug} alt="" />
            <h4>Выберите услугу</h4>
            <p>
              В супермаркете WorkTap представлен широкий <br /> выбор услуг от
              квалифицированных специалистов.
            </p>
          </div>
          <div className=" flex flex-col gap-2 justify-center items-start">
            <img src={withdraw} alt="" />
            <h4>Оплатите</h4>
            <p>
              Деньги будут перечислены продавцу после <br /> того, как он
              выполнит работу, и вы её одобрите.
            </p>
          </div>
          <div className=" flex flex-col gap-2 justify-center items-start">
            <img src={result} alt="" />
            <h4>Получите результат</h4>
            <p>
              Наш супермаркет гарантирует вам возврат средств <br /> в полном
              объёме в случае невыполнения заказа.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
