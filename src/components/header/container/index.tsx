"use client";
import React, { useState, useEffect } from "react";
import Search from "../search";
import ActionButtons from "../actions";
import CategoryMenu from "../category";
import MiniCategory from "../category/miniCategory";
import { BsSearch } from "react-icons/bs";
const HeaderContainer = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollSmall, setIsScrollSmall] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY === 0) {
      setIsScrollSmall(true);
    } else if (scrollY > 156) {
      setIsScrollSmall(false);
    }
  }, [scrollY]);

  return (
    <div className={`w-full max-md:bg-yellow max-md:py-2.5 ${!isScrollSmall ? "fixed top-[-150px] animate-open duration-300 shadow-md " : ""}`}>
      <div className={`container mx-auto flex flex-col gap-10 md:duration-300 md:transition-spacing ${!isScrollSmall ? "py-2.5" : "md:pt-8"}`}>
        <div className="flex justify-between w-full items-center gap-10">
          <div className="text-3xl whitespace-nowrap">E commerce</div>
          <Search  />
          <ActionButtons className="max-md:hidden" />
          <MiniCategory>
            <ActionButtons />
          </MiniCategory>
        </div>
        {isScrollSmall && (
          <div className="flex justify-between gap-10 max-md:hidden">
            <CategoryMenu />
            <div className="text-sm font-semibold">Free Shipping on Orders $500+</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderContainer;
