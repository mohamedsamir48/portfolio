import React, { forwardRef } from "react";

const Intro2 = forwardRef(({ aboutRef }, ref) => {
  return (
    <div
      ref={ref}
      className="flex relative w-[100vw] h-[90vh] circle justify-start mt-[50px] "
    >
      <div className="flex-col flex justify-start items-start bg-red-500 mt-[50px] ml-[100px] w-[30vw] h-[50vh]">
        <h1 className="font-black text-black">I am Mohamed Samir</h1>
        <h2 className="font-black text-black">Web developer</h2>
      </div>
      <img
        className="absolute right-0 bottom-0 w-[700px]"
        src={require("../assets/mohamed1-no-background.png")}
      />
    </div>
  );
});

export default Intro2;
