import React, { useState, useEffect } from "react";
import { AJAX } from "../../../utils/api";
import { API_URL } from "../../../utils/config";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwitchItem from "./SwitchItem";
function Switch({ hotels, places, houses }) {
  const [value, setValue] = useState("0"); // значення вкладки за замовчуванням
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(hotels);
  console.log(hotels);
  console.log(hotels);
  console.log(hotels);

  /*   useEffect(() => {
    // Fetch users and total occupied places by hotel when the component mounts
    async function fetchData() {
      try {
        const [hotelsData, placesData, housesData] = await Promise.all([
          AJAX(`${API_URL}/api/hotels`),
          AJAX(`${API_URL}/api/totalOccupiedPlaces`),
          AJAX(`${API_URL}/api/houses`),
        ]);
        setHotels(hotelsData);
        setOccupiedPlacesByHotel(placesData);
        setHouses(housesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
 */

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            value={value}
            onChange={handleChange}
            variant={"fullWidth"}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab value="0" label="Hotels" sx={{ fontSize: 16 }} />
            <Tab value="1" label="Houses" sx={{ fontSize: 16 }} />
          </TabList>
        </Box>

        <TabPanel value="0">
          <SwitchItem data={hotels} places={places} type="hotel" />
        </TabPanel>
        <TabPanel value="1">
          <SwitchItem data={houses} type="house" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Switch;
