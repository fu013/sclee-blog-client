"use client";
import React, { useState } from "react";

const Main = () => {
  return (
    <main>
      <div className="feed-menu-wrapper">
        <ol className="feed-menu">
          <li className="fm-li">글</li>
          <li className="fm-li">시리즈</li>
          <li className="fm-li">소개</li>
        </ol>
      </div>
    </main>
  );
};

export default Main;
