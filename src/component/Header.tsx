"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

const Header = () => {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(
    theme === "system" ? "dark" : theme
  );

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percentage = (scrollPosition / totalHeight) * 100;
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCurrentTheme(theme === "system" ? "dark" : theme);
  }, [theme]);

  return (
    <nav>
      <div className="max-w-full mx-auto desktop:px-16 mobile:px-4 fixed top-0 left-0 w-full h-[55px] px-4 shadow-header overflow-hidden z-50 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center h-full">
          {/* 메뉴 */}
          <div onClick={() => router.push("/")} className="flex space-x-4">
            <div>
              <Link
                href="/"
                className="flex items-center py-0 text-gray-700 dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-logo italic text-lightColor font-bold dark:text-darkColor text-[1.5rem] ease duration-300 transition-all">
                  SEUNGCHAN
                </span>
              </Link>
            </div>
          </div>

          {/* 메뉴2 */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className="py-0 px-3 text-gray-700 dark:text-white hover:text-gray-900 font-[600]"
              >
                About
              </Link>
              <Link
                href="/blog?page=1"
                className="py-0 px-3 text-gray-700 dark:text-white hover:text-gray-900 font-[600]"
              >
                Blog
              </Link>
              {/* <a
                href="#"
                className="py-5 px-3 text-gray-700 dark:text-white hover:text-gray-900"
              >
                GuestBook
              </a> */}
            </div>
            <div
              className="ease-in-out duration-300 transition-all rounded-[100%] cursor-pointer p-1.5 hover:bg-[#f1f1f1] dark:hover:bg-[#aaa]"
              onClick={() => {
                setTheme(currentTheme === "dark" ? "light" : "dark");
              }}
            >
              {theme?.toLowerCase() === "dark" ? (
                <img
                  className="w-[24px] ease-in-out duration-300 transition-all"
                  src="/moon_w.png"
                />
              ) : (
                <img
                  className="w-[24px] ease-in-out duration-300 transition-all"
                  src="/sun.png"
                />
              )}
            </div>
          </div>

          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#ebebeb] dark:bg-[#b3b3b3] transition-background duration-300 ease z-50">
          <span
            className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500  border-[#12c2e9] transition-background duration-300 ease"
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>
      </div>

      {/* mobile menu items */}
      <div className={classNames("md:hidden", { hidden: !menuToggle })}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
      </div>
    </nav>
  );
};

export default Header;
