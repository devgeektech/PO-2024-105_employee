import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectFade, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.scss";
import { Swiper as SW } from "swiper/types";
import { MIME_TYPE_MAP } from "../../../constants/utlis";

export default function SingleSlideSlider({ imageList }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SW>();
  const fileUrl = process.env.REACT_APP_FILE_URL;
  let previewImgArr = [];

  if (imageList?.length > 0) {
    for (let item of imageList) {
      const extension = item.split('.').pop().toLowerCase();
      let mimeType = MIME_TYPE_MAP[extension] || 'application/octet-stream';

      previewImgArr.push({
        preview: item,
        type: mimeType,
      })
    }
  }


  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {previewImgArr?.length &&
          previewImgArr.map(({ preview, type }, index) => (
            <SwiperSlide>

              {type.startsWith('video') ? (
                <video src={preview
                  ? fileUrl + preview
                  : "/assets/img/slideOne.jpg"} controls className="w-100 h-auto" />
              ) : (
                <img src={preview
                  ? fileUrl + preview
                  : "/assets/img/slideOne.jpg"} alt={`Preview ${index}`} className="w-100 h-auto" />
              )}

            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={14}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        breakpoints={{
          300: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          430: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          575: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 8,
            spaceBetween: 15,
          },
          // 800: {
          //   slidesPerView: 8,
          //     spaceBetween: 15,
          // },
          992: {
            slidesPerView: 10,
            spaceBetween: 15,
          },
          // 1024: {
          //     slidesPerView: 10,
          //     spaceBetween: 15,
          // },
          1200: {
            slidesPerView: 12,
            spaceBetween: 15,
          },
          // 1366: {
          //   slidesPerView: 12,
          //   spaceBetween: 14,
          // },
          1400: {
            slidesPerView: 14,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 13,
            spaceBetween: 20,
          },
        }}
      >
        {previewImgArr?.length &&
          previewImgArr.map(({ preview, type }, index) => (
            <SwiperSlide>

              {type.startsWith('video') ? (
                <video src={preview
                  ? fileUrl + preview
                  : "/assets/img/slideOne.jpg"} />
              ) : (
                <img src={preview
                  ? fileUrl + preview
                  : "/assets/img/slideOne.jpg"} alt={`Preview ${index}`} />
              )}

            </SwiperSlide>
          ))}

      </Swiper>
    </>
  );
}
