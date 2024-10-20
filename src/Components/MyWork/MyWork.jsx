import React from "react";
import work from "../../assets/mywork.svg";;

const MyWork = ({title,price,image}) => {
  
  return (
    <div>
          <div className="flex flex-col overflow-hidden justify-between w-[310px] h-[276px] rounded-3xl border-1">
           <img className="w-full h-[65%] object-cover" src={`http://localhost:4040/${image}`} alt="" />
           <div className="">
            <div className="p-3">
              <h3>{title}</h3>
              <h4 className="text-green-400 ">{price} USD</h4>
            </div>
           </div>
          </div>
    </div>
  );
};

export default MyWork;