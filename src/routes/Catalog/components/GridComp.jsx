import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import { useTheme, Pagination, Card, Box } from "@mui/material/";
import Skeleton from "@mui/material/Skeleton";
import GridData from "./GridData";
import { fetchHotels } from "../../../redux/slices/hotelsSlice";
import { fetchHouses } from "../../../redux/slices/housesSlice";
import {
  fetchOccupiedPlacesByHotel,
  fetchRooms,
} from "../../../redux/slices/roomsSlice";
function GridComp({ info, places = undefined, type }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [currentPage, useCurrentPage] = useState(1);
  const [currentLimit, useCurrentLimit] = useState(9);
  const { id } = useParams();
  console.log(id, "here is an id");
  useEffect(() => {
    if (type === "house") {
      dispatch(fetchHouses({ page: currentPage, limit: currentLimit }));
    } else if (type === "hotel") {
      dispatch(fetchHotels({ page: currentPage, limit: currentLimit })),
        dispatch(fetchOccupiedPlacesByHotel());
    } else {
      dispatch(fetchRooms({ id, page: currentPage, limit: currentLimit }));
    }
  }, [currentPage, type]);

  const handlePagination = (e, value) => {
    useCurrentPage(value);
  };
  console.log(info, "info");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        rowSpacing={5}
        columnSpacing={5}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {info.isLoading
          ? Array.from({ length: currentLimit }).map((_, index) => (
              <Grid key={index}>
                <GridData
                  item={_}
                  isLoading={info.isLoading}
                  theme={theme}
                  places={places}
                  type={type}
                />
              </Grid>
            ))
          : info.data?.map((item) => (
              <Grid key={item.id}>
                <GridData
                  item={item}
                  isLoading={info.isLoading}
                  theme={theme}
                  places={places}
                  type={type}
                />
              </Grid>
            ))}
      </Grid>
      {info.data.length !== 0 && (
        <Pagination
          count={Math.ceil(info.quantity / currentLimit)}
          color="primary"
          onChange={handlePagination}
          sx={{ marginTop: "20px" }}
        />
      )}
    </Box>
  );
}

export default GridComp;
