import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { fetchHotels } from "../../../redux/slices/hotelsSlice";
import { fetchHouses } from "../../../redux/slices/housesSlice";
import { fetchOccupiedPlacesByHotel } from "../../../redux/slices/roomsSlice";
function Switch({ value, setValue }) {
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchHouses());
    dispatch(fetchOccupiedPlacesByHotel());
  }, []);
  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            value={value}
            onChange={handleChange}
            variant={"fullWidth"}
            indicatorColor="secondary"
            textColor="primary"
          >
            <Tab value="0" label="Hotels" sx={{ fontSize: 16 }} />
            <Tab value="1" label="Houses" sx={{ fontSize: 16 }} />
          </TabList>
        </Box>

        {/*   <TabPanel value="0">
          {!hotels.isLoading && (
            <SwitchItem data={hotels.data} places={places.data} type="hotel" />
          )}
        </TabPanel>
        <TabPanel value="1">
          {!houses.isLoading && <SwitchItem data={houses.data} type="house" />}
        </TabPanel> */}
      </TabContext>
    </Box>
  );
}

export default Switch;
