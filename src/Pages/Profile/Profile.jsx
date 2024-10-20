import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Accordions from "../../Components/Accordion/Accordion";
import MyWork from "../../Components/MyWork/MyWork";
import Footer from "./../../Components/Footer/Footer";
import Reviews from "../../Components/Reviews/Reviews";
import Loader from "../../Components/Loader/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ isFetched: false, data: [] });
  const [review, setReview] = useState({ isFetched: false, data: [] });
  const [works, setWorks] = useState({ isFetched: false, data: [] });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("/profile", {
          headers: {
            Authorization: token,
          },
        });

        const info = res.data.data;
        setProfile({ isFetched: true, data: info });
      } catch (error) {
        toast(error.response.data.msg, { type: "error" });
      }
    };

    fetchData();
  }, [page, limit]);

  const loadMoreReviews = async () => {
    try {
      const nextPage = page + 1;
      const newLimit = 6;
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `/review?page=${nextPage}&limit=${newLimit}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const newReviews = res.data.data.reviews;
      const count = res.data.data.totalReviews
      console.log(count);
      setReview((prevState) => ({
        isFetched: true,
        data: [...prevState.data, ...newReviews,],
      }));
      console.log(review);
      setPage(nextPage);
      setLimit(newLimit);
    } catch (error) {
      toast(error.response?.data?.msg || "Bir hata oluştu", { type: "error" });
    }
  };
  useEffect(() => {
    loadMoreReviews();
  }, []);

  useEffect(() => {
    const fetchProfile = () => {
      const token = localStorage.getItem("token");

      return axios
        .get("/profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const workIds = response.data.data.work;
          const workPromises = workIds.map((workId) =>
            axios.get(`/works/${workId}`, {
              headers: {
                Authorization: token,
              },
            })
          );

          return Promise.all(workPromises);
        })
        .then((workResponses) => {
          setWorks({
            isFetched: true,
            data: workResponses.map((res) => res.data),
          });
        })
        .catch((error) => {
          toast(error.response.data, { type: "error" });
        });
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="flex h-min-[80vh]">
          <div className=" w-[80%]  flex flex-col gap-5 justify-center items-start">
            <h4 className="text-orange-400">
              {Array.isArray(profile.data.skill) &&
              profile.data.skill.length >= 5
                ? profile.data.skill[4].toUpperCase() + " developer"
                : "Developer"}
            </h4>
            <h1>
              <span className="text-green-500">{profile.data.name} </span>
              {profile.data.surname}
            </h1>
            <p className="w-[90%]">{profile.data.information}</p>
            <div className="grid h-min-[200px]  grid-cols-4 grid-rows-2 gap-4 p-3">
              {Array.isArray(profile.data.skill) &&
              profile.data.skill.length > 0 ? (
                profile.data.skill.map((skill, index) => (
                  <Link
                    key={index}
                    className="border-1 h-min-[30px] w-min-[100px] hover:border-green-400 hover:text-green-400 rounded-3xl text-center no-underline text-black bg-[#f0ffff]"
                  >
                    {skill}
                  </Link>
                ))
              ) : (
                <Loader />
              )}
            </div>
            <div className=" h-[500px] w-[600px]">
              {
                <Accordions
                  key={profile.data._id}
                  registered={profile.data.registered}
                  city={profile.data.city}
                  education={profile.data.education}
                  language={profile.data.language}
                  certificates={profile.data.certificates}
                />
              }
            </div>
          </div>
          <div className="  flex items-start justify-center">
            <img
              className="w-[500px] rounded-full"
              src={`http://localhost:4040/${profile.data.image}`}
              alt=""
            />
          </div>
        </div>
        <div className="mt-20">
          <h5>Мой ворки</h5>
          <div className="grid grid-cols-4 gap-5">
            <Link className="flex no-underline bg-[#D7FFEC] flex-col justify-center items-center w-[310px] h-[276px] rounded-3xl border-1">
              <i className="text-[100px] text-[#1DBF73] fa-solid fa-circle-plus"></i>
              <h3 className="text-[#1DBF73]">Создать ворк</h3>
            </Link>
            {works && works.isFetched && Array.isArray(works.data) && (
  works.data.filter(item => item && item.data && item.data.title).map((item) => (
    <MyWork
      key={item.data._id}
      title={item.data.title}
      price={item.data.price}
      image={item.data.image}
    />
  ))
)}
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-3 mb-5 mt-5 ">
            <h3>Отзывы</h3>
            <div className="flex">
              <p>Положительные (65)</p>
              <p>Отрицательные(10)</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {review.isFetched &&
              Array.isArray(review.data) &&
              review.data.map((review, index) =>(
                <Reviews
                  key={index}
                  author={review.author}
                  content={review.content}
                />
              ))}
          </div>
          <div className="flex justify-center items-center h-[100px]">
  <button
    onClick={loadMoreReviews}
    className="h-[35px] w-[150px] rounded-2xl border-1 border-green-500 text-green-500 transition-all hover:transition-all hover:bg-green-500 hover:text-white"
  >
    Загрузить еще
  </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
