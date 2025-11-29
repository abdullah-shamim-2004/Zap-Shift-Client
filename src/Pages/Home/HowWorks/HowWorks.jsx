import React, { useEffect, useState } from "react";
import { GrMapLocation } from "react-icons/gr";

const HowWorks = () => {
  const [howWorks, setHowWorks] = useState([]);
  // console.log(howWorks);

  useEffect(() => {
    fetch("./HowWorks.json")
      .then((res) => res.json())
      .then((data) => setHowWorks(data));
  }, []);
  return (
    <div className="p-10 space-y-2">
        <h3 className="text-2xl font-bold ">How it Works</h3>
      <div className="flex gap-3">
        {howWorks.map((data) => (
          <div
            className=" rounded-2xl min-h-[200px] flex flex-col text-start justify-center p-5 bg-[#f9f9fa]"
            key={data.id}
          >
            <GrMapLocation />

            <h3 className="text-2xl font-bold text-black">{data.title}</h3>
            <p className="text-gray-700">{data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
