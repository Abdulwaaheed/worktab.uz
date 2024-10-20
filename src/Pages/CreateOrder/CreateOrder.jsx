import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { FloatingLabel, Label, Select } from "flowbite-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [orderTitle, setOrderTitle] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [categories, setCategories] = useState({ isFecth: false, data: [] });
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/category");
        setCategories(response.data.data);
        console.log(selectedCategory);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "orderTitle":
        setOrderTitle(value);
        break;
      case "orderPrice":
        setOrderPrice(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    try {
      const resOrder = await axios.post("/order", {
        title: orderTitle,
        price: orderPrice,
        category: selectedCategory,
      });
      console.log(resOrder);
    } catch (error) {
      console.error("Xatolik sodir boldi:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="w-full flex flex-col justify-center items-center h-[50vh]">
          <form
            onSubmit={handleSubmit}
            className="w-1/2 h-full flex flex-col gap-4"
          >
            <FloatingLabel
              className=""
              variant="outlined"
              label="Название"
              sizing="sm"
              value={orderTitle}
              name="orderTitle"
              onChange={handleInputChange}
            />
            <FloatingLabel
              className=""
              variant="outlined"
              label="цена"
              sizing="sm"
              value={orderPrice}
              name="orderPrice"
              onChange={handleInputChange}
            />
            <div className="flex gap-5">
              <div className="">
                <Label htmlFor="category" value="Категория" />
                {categories.data ? (
                  <Select
                    id="category"
                    required
                    className="w-[300px] mt-1"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.data.map((category) => (
                      <option key={category.id}>{category.title}</option>
                    ))}
                  </Select>
                ) : (
                  <Select
                    id="category"
                    required
                    className="w-[300px] mt-1"
                    name="category"
                    disabled
                  >
                    <option value="">Kategoriyalar yuklanmoqda...</option>
                  </Select>
                )}
              </div>
            </div>
          </form>
          <button
            type="submit"
            form="myForm"
            onClick={handleSubmit}
            className="w-40 h-12  rounded-3xl text-white  bg-[#1DBF73]"
          >
            Дальше
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
