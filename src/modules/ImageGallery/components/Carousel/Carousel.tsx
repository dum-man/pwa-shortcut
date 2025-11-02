/* eslint-disable @next/next/no-img-element */

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useMediaQuery } from "@/hooks";

interface IProps {
  base64Images: string[];
  onGalleryOpen: (idx: number) => void;
}

const Carousel = ({ base64Images, onGalleryOpen }: IProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      slidesPerView={isMobile ? 1 : 2}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      {base64Images.map((base64Image, idx) => (
        <SwiperSlide key={idx}>
          <img src={base64Image} alt="" onClick={() => onGalleryOpen(idx)} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
