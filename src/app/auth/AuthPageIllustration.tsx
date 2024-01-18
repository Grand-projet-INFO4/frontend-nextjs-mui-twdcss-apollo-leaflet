"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import image1 from "@/assets/imgs/pexels-tony-schnagl-5588380.jpg";
import image2 from "@/assets/imgs/pexels-cottonbro-studio-5083397.jpg";
import image3 from "@/assets/imgs/pexels-cottonbro-studio-5077054.jpg";

export default function AuthPageIllustration() {
  return (
    <div className="w-full h-full">
      <Swiper
        className="h-full"
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <Image src={image1} priority className="h-full object-cover" alt="User on laptop" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={image2} className="h-full object-cover" alt="Dashboard" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={image3} className="h-full object-cover" alt="Notifications" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
