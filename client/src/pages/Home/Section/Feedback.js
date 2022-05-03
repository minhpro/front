import * as Mui from "@mui/material";
import React from "react";
import styled from "styled-components";
import * as Co from "components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Pagination, Autoplay } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Feedback = () => {
  SwiperCore.use([EffectFade, Pagination, Autoplay]);
  return (
    <Style.Wrapper className="container">
      <Mui.Stack alignItems={"center"}>
        <Style.Title> Cảm Nhận Của Người Dùng</Style.Title>
        <Mui.Stack direction={"row"} width={"100%"}>
          <Swiper
            spaceBetween={50}
            slidesPerView={"auto"}
            centeredSiles={true}
            pagination={true}
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1340: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            style={{
              padding: "5px 0",
            }}
          >
            {data.map((item, i) => {
              return (
                <SwiperSlide
                  style={{
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Co.Card.Feedback
                    name={item.name}
                    img={item.img}
                    type={item.type}
                    feed={item.feed}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Mui.Stack>
      </Mui.Stack>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.section`
    min-height: 300px;
    margin-top: 40px;
  `,

  Title: styled.h3`
    color: var(--bs-primary);
  `,

  HeroImg: styled.img`
    width: 100%;
  `,
  HeathyImg: styled.img`
    width: 100%;
  `,
};

const data = [
  {
    name: "Thầy Phan Minh Trí",
    type: "THPT Tân Hiệp - TỈnh Kiên Giang",
    feed: "Áp dụng EDB LMS trong việc giảng dậy mang lại nhiều thuận lợi cho giáo viên.",
    img: "testi-1",
  },
  {
    name: "Thầy Đỗ Trung Kiên",
    type: "THPT Tân Hiệp - TỈnh Kiên Giang",
    feed: "Áp dụng EDB LMS trong việc giảng dậy mang lại nhiều thuận lợi cho giáo viên.",
    img: "testi-4",
  },
  {
    name: "Cô Dương Xuân Hoa",
    type: "THPT Tân Hiệp - TỈnh Kiên Giang",
    feed: "Áp dụng EDB LMS trong việc giảng dậy mang lại nhiều thuận lợi cho giáo viên.",
    img: "testi-3",
  },
  {
    name: "Thầy Trần Tuấn Hải",
    type: "THPT Tân Hiệp - TỈnh Kiên Giang",
    feed: "Áp dụng EDB LMS trong việc giảng dậy mang lại nhiều thuận lợi cho giáo viên.",
    img: "testi-2",
  },
];
