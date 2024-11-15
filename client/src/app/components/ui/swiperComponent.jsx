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

// import React from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import "../../styles/ui/carousel.scss";
// const Carousel = ({ objI }) => {
//   const handleImageChange = (arr) => {
//     const activeSlide = document.querySelector(".active-slide");
//     const slides = [...document.querySelectorAll(".slide")];
//     const currentIndex = slides.indexOf(activeSlide);
//     let newIndex = currentIndex + arr;

//     if (newIndex < 0) {
//       newIndex = slides.length - 1;
//     }
//     if (newIndex >= slides.length) {
//       newIndex = 0;
//     }

//     slides[newIndex].classList.add("active-slide");
//     activeSlide.classList.remove("active-slide");
//   };

//   const onNext = () => handleImageChange(1);
//   const onPrev = () => handleImageChange(-1);
//   return (
//     <div>
//       <button className="carousel-button next" onClick={onNext}>
//         <IoIosArrowForward />
//       </button>
//       <button className="carousel-button prev" onClick={onPrev}>
//         <IoIosArrowBack />
//       </button>
//       <ul className="slider">
//         {objI.map((o) => (
//           <li
//             key={o.id}
//             className={`slide ${o.active === true ? "active-slide" : null}`}
//           >
//             <img className="slide-img" src={o.img} alt="" />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Carousel;
