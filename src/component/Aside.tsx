"use client";
import React, { useState } from "react";

const Aside = () => {
  return (
    <aside>
      <div className="card bg-[url('/dogProfile.png')] bg-no-repeat bg-center bg-cover" />
      <h5 className="text-gray-700 mt-5 basic-font-color mx-auto text-center">
        기억은 잊혀지지만, <br />
        기록은 영원하다.
      </h5>
      <div className="mt-10">
        <h5 className="text-[#2bc1bc] font-bold text-[1.25rem]">
          <img
            className="w-[24px] ease-in-out duration-300 transition-all inline-block mr-2"
            src="/category.png"
          />
          Category
        </h5>
        <ul className="text-gray-700 basic-font-color">
          <li className="ct-li basic-font-color">All(3)</li>
          <li className="ct-li">Daily</li>
          <li className="ct-li">Dev</li>
          <li className="ct-li">Game</li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
