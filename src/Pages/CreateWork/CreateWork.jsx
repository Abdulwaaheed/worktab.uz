import React from "react";
import Navbar from "./../../Components/Navbar/Navbar";
import { FloatingLabel, Label, Select } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CreateWork = () => {

    const [workTitle, setWorkTitle] = useState('');
    const [category, setCategory] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'workTitle') {
        setWorkTitle(value);
      } else if (name === 'category') {
        setCategory(value);
      } else if (name === 'subCategory') {
        setSubCategory(value);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const resCategory = await axios.get("/category",)
        const categoryId = resCategory.data.data.category
        console.log(categoryId);
        const resWork = await axios.post('/works', {
          title: workTitle,
        });
      } catch (error) {
        console.error('Xatolik sodir boldi:', error);
      }
    };
  
  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="w-full flex flex-col justify-center items-center h-[50vh]">
          <form onSubmit={handleSubmit} className="w-1/2 h-full flex flex-col gap-4">
            <FloatingLabel
              className=""
              variant="outlined"
              label="Название"
              sizing="sm"
              value={workTitle}
              name="workTitle"
              onChange={handleInputChange}
            />
            <div className="flex gap-5">
              <div className="">
                <Label htmlFor="countries" value="Категория" />
              <Select id="countries" required className="w-[300px] mt-1">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
              </div>
              <div className="">
                <Label htmlFor="countries" value="Подкатегория" />
              <Select id="countries" required className="w-[300px] mt-1">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
              </div>
            </div>
          </form>
            <button className="w-40 h-12  rounded-3xl text-white  bg-[#1DBF73]">Дальше</button>
        </div>
      </div>
    </div>
  );
};

export default CreateWork;
