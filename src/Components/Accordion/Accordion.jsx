import { Accordion } from "flowbite-react";
import React from "react";

const Accordions = ({ city, education, language, certificates ,registered}) => {
return (      
<Accordion>
      <Accordion.Panel>
        <Accordion.Title className="text-xl h-[80px] ">Показать подробную информацию</Accordion.Title>
        <Accordion.Content>
        <div className="flex justify-around items-center">
             <h6 className="w-[45%]">
               <i className="fa-solid fa-globe"></i> Страна:{" "}
             </h6>
             <p className="w-[45%]">{city}</p>
           </div>
           <div className="flex justify-around items-center">
             <h6 className="w-[45%]">
               <i className="fa-solid fa-clock"></i> На сайте:{" "}
             </h6>
             <p className="w-[45%]">{registered}</p>
           </div>
           <div className="flex justify-around items-start">
             <h6 className="w-[45%]">
               <i className="fa-solid fa-landmark"></i> Образование:
             </h6>
             <ol className="w-[45%] list-decimal">
             {(education && Array.isArray(education))
                ? education.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : null}
            </ol>
          </div>
          <div className="flex justify-around items-start">
            <h6 className="w-[45%]">
              <i className="fa-solid fa-language"></i> Знание языков:
            </h6>
            <ol className="w-[45%] list-decimal">
            {(language && Array.isArray(language))
                ? language.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : null}
            </ol>
          </div>
          <div className="flex justify-around items-start">
            <h6 className="w-[45%]">
              <i className="fa-regular fa-file-lines"></i> Сертификаты:
            </h6>
            <ol className="list-decimal w-[45%]">
              {(certificates && Array.isArray(certificates))
                ? certificates.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : null}
            </ol>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>

  ); 
};

export default Accordions;