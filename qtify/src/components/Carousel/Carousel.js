import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import "swiper/css/navigation";
import Card from "../Card/Card";
import { Navigation } from "swiper/modules";

const Carousel = ({cardData,type}) =>{
    return (
        <Swiper
          modules={[Navigation]} 
          slidesPerView={5} 
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 }, 
            768: { slidesPerView: 3 }, 
            1024: { slidesPerView: 5 },
          }}
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <Card data={card} type={type}/>
            </SwiperSlide>
          ))}
        </Swiper>
      );
}
export default Carousel;