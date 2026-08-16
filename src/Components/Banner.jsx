import React from "react";

const Banner = () => {
  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url("https://i.pinimg.com/736x/bd/9d/40/bd9d40cc3e0c546f022378dbb3e4aee7.jpg") `,
      }}
    >
      <div className="text-white text-2xl font-bold w-full text-center bg-black p-4 ">
        Avengers Endgame
      </div>
    </div>
  );
};

export default Banner;
