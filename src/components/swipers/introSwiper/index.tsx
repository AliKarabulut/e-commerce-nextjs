"use client";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type SwiperProps = {
  slides?: {
    id: string;
    description: string;
    imageId: string;
    image: {
      id: string;
      urls: string[];
      main: boolean;
      optionId: string | null;
      sliderId: string | null;
    };
  }[];
};

const IntroSwiper = ({ slides }: SwiperProps) => {
  return (
    <Swiper modules={[Pagination, Navigation]} slidesPerView={1} pagination={{ clickable: true }} navigation className="h-96">
      <SwiperSlide className="bg-gradient-to-r from-grayLighter to-grayLight"></SwiperSlide>
      <SwiperSlide className="bg-gradient-to-r from-grayLighter to-grayLight"></SwiperSlide>
      <SwiperSlide className="bg-gradient-to-r from-grayLighter to-grayLight"></SwiperSlide>
    </Swiper>
  );
};

export default IntroSwiper;
