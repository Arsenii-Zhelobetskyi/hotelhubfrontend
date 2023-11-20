import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Carousel({ photo }) {
  console.log(photo);
  return (
    <div className={"carousel"}>
      <Swiper
        pagination={{ clickable: true }}
        grabCursor={true}
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
      >
        {photo?.other?.map((photo, index) => (
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
      <div className="swiper-button-prev">
        <IconButton>
          <ArrowBack />
        </IconButton>
      </div>
      <div className="swiper-button-next">
        <IconButton>
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
}

export default Carousel;
