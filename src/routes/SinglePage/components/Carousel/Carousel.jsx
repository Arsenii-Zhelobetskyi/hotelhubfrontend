import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTheme } from "@mui/material/styles";
function Carousel({ photo }) {
  const [_, setButtonsInit] = useState();
  const theme = useTheme();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className={"carousel"}>
      <Swiper
        pagination={{ clickable: true }}
        grabCursor={true}
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setButtonsInit(true)}
      >
        {photo?.data?.map((photo, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              sx={{
                height: 784,
                width: 856,
                maxHeight: { xs: 900, md: 784 },
                maxWidth: { xs: 856, md: 856 },
                objectFit: "cover",
                borderRadius: "16px",
                marginTop: "20px",
              }}
              alt="The house from the offer."
              src={photo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        sx={{
          width: "60px",
          height: "60px",
          color: "white",
          backgroundColor: theme.palette.primary.main,
          position: "absolute",
          left: "0",
          top: "50%",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
        ref={prevRef}
        className="swiper-button-prev"
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        sx={{
          width: "60px",
          height: "60px",
          color: "white",
          backgroundColor: theme.palette.primary.main,
          position: "absolute",
          right: "0",
          top: "50%",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
        ref={nextRef}
        className="swiper-button-next"
      >
        <ArrowForward />
      </IconButton>
    </div>
  );
}

export default Carousel;
