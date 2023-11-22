import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Grid from "@mui/material/Unstable_Grid2";

import { useTheme, Pagination, Card, Box } from "@mui/material/";

import GridData from "./GridData";
import { fetchHotels } from "../../../redux/slices/hotelsSlice";
import { fetchHouses } from "../../../redux/slices/housesSlice";
import { fetchOccupiedPlacesByHotel } from "../../../redux/slices/roomsSlice";

function GridComp({ info, places = undefined, type }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [currentPage, useCurrentPage] = useState(1);
  const [currentLimit, useCurrentLimit] = useState(9);
  console.log(currentPage, type);
  useEffect(() => {
    if (type === "house") {
      dispatch(fetchHouses({ page: currentPage, limit: currentLimit }));
    } else {
      dispatch(fetchHotels({ page: currentPage, limit: currentLimit })),
        dispatch(fetchOccupiedPlacesByHotel());
    }
  }, [currentPage, type]);
  const handlePagination = (e, value) => {
    useCurrentPage(value);
  };
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
        {info.data?.map((item) => (
          <Grid key={item.id}>
            <GridData item={item} theme={theme} places={places} type={type} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(info.quantity / currentLimit)}
        color="primary"
        onChange={handlePagination}
        sx={{ marginTop: "20px" }}
      />
    </Box>
  );
}

export default GridComp;
