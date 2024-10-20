import React, { useEffect, useState } from 'react';
import userAvatar from '../../assets/avatar.svg';
import rating from '../../assets/rate.svg';
import axios from 'axios';

const User = ( { username, skill, title,image}) => {
 
  return (
    <div className='w-[400px] px-2 h-[230px] border-2 flex flex-col justify-center'>
     
        <div className="flex justify-around p-2">
          <img className='w-32 rounded-[50%] object-cover' src={image} alt="" />
          <div>
            <h6>{username}</h6>
            <h5>{skill}</h5>
            <p>{title}</p>
            <img src={rating} alt="" />
          </div>
        </div>
      <button className='w-full h-8 mt-6 rounded-2xl border-1 border-green-500 text-green-500 transition-all hover:transition-all hover:bg-green-500 hover:text-white'>Написать</button>
    </div>
  );
}

export default User;