"use client";
import React, { useState } from "react";

const Aside = () => {
  return (
    <aside>
      <div className="card">Profile</div>
      <h5 className="text-gray-700 mt-5 basic-font-color mx-auto text-center">
        Memories may be forgotten, <br />
        but records are eternal
      </h5>
      <div className="mt-10">
        <h5 className="text-[#2bc1bc] font-bold text-[1.25rem]">Category</h5>
        <ul className="text-gray-700 basic-font-color">
          <li className="ct-li">All(3)</li>
          <li className="ct-li">Daily</li>
          <li className="ct-li">Dev</li>
          <li className="ct-li">Game</li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
