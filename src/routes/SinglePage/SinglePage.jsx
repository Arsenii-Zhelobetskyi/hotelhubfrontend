import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSinglePage } from "../../redux/slices/singlePageSlice.jsx";
import Comments from "./components/Comments/Comments.jsx";
import Carousel from "./components/Carousel/Carousel.jsx";
import GridComp from "../Catalog/components/GridComp.jsx";
import { fetchRooms } from "../../redux/slices/roomsSlice.jsx";
import AlertComp from "../../components/Alert/AlertComp.jsx";

function SinglePage() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const singlePage = useSelector((state) => state.singlePage);
  const rooms = useSelector((state) => state.rooms);
  console.log(singlePage, "singlePage");
  const navigateTo = useNavigate();
  const { data } = singlePage;
  const { type, id } = useParams();
  useEffect(() => {
    dispatch(fetchSinglePage({ type, id }));
  }, [type]);
  console.log(data);
  const handleClick = () => {
    setOpen(true);
  };

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
          <Typography variant="headline2" sx={{ my: "20px" }}>
            Description
          </Typography>
          <Typography variant="body" sx={{ my: "5px" }}>
            {data.description}
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", my: "5px" }}>
            <Typography variant="caption1" sx={{ color: "text.primary" }}>
              place numbers
            </Typography>
            <Typography variant="body">{data.placeN}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px", my: "5px" }}>
            <Typography variant="caption1" sx={{ color: "text.primary" }}>
              number of rooms
            </Typography>
            <Typography variant="body">{data.roomN}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px", my: "5px" }}>
            <Typography variant="caption1" sx={{ color: "text.primary" }}>
              contact us
            </Typography>
            <Typography variant="body">{data.contact_inf}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <AlertComp open={open} setOpen={setOpen} text="Add to favorites!" />
          {type !== "hotel" && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigateTo(`/order-now/${type}/${id}`)}
              >
                Order now
              </Button>
            </>
          )}
        </Box>
      </Box>
      {type == "hotel" && (
        <>
          <Typography variant="headline2" sx={{ my: "20px" }}>
            Rooms:
          </Typography>
          <GridComp info={rooms} places={undefined} type={"room"} />
        </>
      )}
      <Comments type={type} id={id} />
    </Box>
  );
}

export default SinglePage;
