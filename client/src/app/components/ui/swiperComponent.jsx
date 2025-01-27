import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../styles/ui/swiperComponent.scss";

const SwiperComponent = ({ objImages, clName }) => {
  return (
    <div className={clName}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        // slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {objImages.map((o) => (
          <SwiperSlide key={o.id}>
            <img className="images-swiper" src={o.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
