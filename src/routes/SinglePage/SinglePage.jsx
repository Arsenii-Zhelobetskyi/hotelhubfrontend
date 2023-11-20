import React, { useEffect } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSinglePage } from "../../redux/slices/singlePageSlice.jsx";
import Comments from "./components/Comments/Comments.jsx";
import Carousel from "./components/Carousel/Carousel.jsx";

function SinglePage() {
  const dispatch = useDispatch();
  const singlePage = useSelector((state) => state.singlePage);
  const { data } = singlePage;
  const { type, id } = useParams();
  useEffect(() => {
    dispatch(fetchSinglePage({ type, id }));
  }, []);
  console.log(data);
  if (singlePage.isLoading) {
    return (
      <Box
        sx={{
          textAlign: "left",
          marginBottom: "250px",
          width: { md: "900px" },
        }}
      >
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={400} height={20} />
        <Skeleton
          variant="rectangular"
          width={856}
          height={784}
          sx={{ borderRadius: "16px" }} // Add borderRadius here
        />
        <Skeleton variant="text" width={350} height={20} />
        <Skeleton variant="text" width={350} height={20} />
        <Skeleton variant="text" width={350} height={20} />
        <Skeleton variant="text" width={350} height={20} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Skeleton variant="rectangular" width={100} height={36} />
            <Skeleton variant="rectangular" width={100} height={36} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" width={856} height={400} />
      </Box>
    );
  }

  return (
    <Box
      sx={{ textAlign: "left", marginBottom: "250px", width: { md: "900px" } }}
    >
      <Typography variant="hero" sx={{ textAlign: "left" }}>
        {data.name}
      </Typography>
      <Typography variant="caption1">{data.address}</Typography>
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
        src={data.photo?.main ? data.photo.main : data.photo}
      />
      <Carousel photo={data.photo} />
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "350px" }}>
          <Typography variant="body">{data.description}</Typography>
          <Typography variant="body">{data.contact_inf}</Typography>
          <Typography variant="body">{data.placeN}</Typography>
          <Typography variant="body">{data.roomN}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button variant="contained" color="secondary">
            Save
          </Button>
          <Button variant="contained" color="primary">
            Order now
          </Button>
        </Box>
      </Box>
      <Comments type={type} id={id} />
    </Box>
  );
}

export default SinglePage;
