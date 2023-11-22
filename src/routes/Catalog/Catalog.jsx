import React, { useState } from "react";
import Switch from "./components/Switch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import GridComp from "./components/GridComp";
import { Box } from "@mui/material";
function Catalog() {
  const [value, setValue] = useState("0"); // значення вкладки за замовчуванням
  const hotels = useSelector((state) => state.hotels);
  const houses = useSelector((state) => state.houses);
  const places = useSelector((state) => state.rooms);
  const authorization = useSelector((state) => state.authorization);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
        marginBottom: "200px",
      }}
    >
      <Switch value={value} setValue={setValue} />
      {value === "0" ? (
        <GridComp key={0} info={hotels} places={places.data} type="hotel" />
      ) : (
        <GridComp key={1} info={houses} type="house" />
      )}
    </Box>
  );
}

export default Catalog;
