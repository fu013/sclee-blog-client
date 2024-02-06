"use client";
import React from "react";
import Skeleton from "./Skeletion";

const Skaside = () => {
  return (
    <aside>
      <Skeleton className="card rounded-full" />
      <Skeleton className="text-gray-700 mt-5 basic-font-color mx-auto text-center h-[3rem] w-full" />
      <div className="mt-10">
        <Skeleton className="text-[#2bc1bc] font-bold text-[1.25rem] w-full block h-[30px]" />
        <ul className="text-gray-700 basic-font-color w-full h-fit">
          <Skeleton className="ct-li w-full block h-[26px]" />
          <Skeleton className="ct-li w-full block h-[26px]" />
          <Skeleton className="ct-li w-full block h-[26px]" />
          <Skeleton className="ct-li w-full block h-[26px]" />
        </ul>
      </div>
    </aside>
  );
};

export default Skaside;
