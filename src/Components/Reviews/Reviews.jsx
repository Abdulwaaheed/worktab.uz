import React, { useState } from 'react';
import rate from '../../assets/rate.svg';
import avatar from '../../assets/avatar.svg';

const   Reviews = ({ author, content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const trimmedContent = content.split(' ').slice(0, 30).join(' ');
  const displayContent = showFullContent ? content : trimmedContent;

  let displayText = displayContent;
  if (!showFullContent && content.length > trimmedContent.length) {
    displayText = `${trimmedContent.trim()}...`;
  }
  let buttonText = showFullContent ? 'Less' : 'More';

  return (
    <div>
      <div className="w-[420px] h-min-[225px] rounded-2xl flex flex-col gap-3 border-1 px-2">
        <div className="flex justify-start gap-5 items-center">
          <img className="w-[80px]" src={avatar} alt="" />
          <div className="">
            <h6>{author}</h6>
            <img src={rate} alt="" />
          </div>
        </div>
        <div className="">
          <p className='inline-block'>{displayText}</p>
          {content.length > 40 && (
            <button className='text-[18px] text-gray-400'  onClick={handleToggleContent}>{buttonText}</button>  
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;