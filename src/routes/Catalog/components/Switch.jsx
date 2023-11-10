import React, { useState,useEffect } from "react";
import { AJAX } from "../../../utils/api";
import { API_URL } from "../../../utils/config";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HotelCard from "./HotelCard.jsx";
import HouseCard from "./HouseCard.jsx";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwitchItem from './SwitchItem'
function Switch() {
  const [value, setValue] = useState(0); // значення вкладки за замовчуванням
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [hotels, setHotels] = useState([]);
  const [houses, setHouses] = useState([]);
  const [places, setOccupiedPlacesByHotel] = useState([]);
  useEffect(() => {
    // Fetch users and total occupied places by hotel when the component mounts
    async function fetchData() {
      try {
        const [hotelsData, placesData, housesData] = await Promise.all([
          AJAX(`${API_URL}/api/hotels`),
          AJAX(`${API_URL}/api/totalOccupiedPlaces`),
          AJAX(`${API_URL}/api/houses`)
        ]);
        console.log(hotelsData);
        console.log(housesData);
        console.log(placesData);
        setHotels(hotelsData);
        setOccupiedPlacesByHotel(placesData);
        setHouses(housesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  // console.log(hotels);
  // console.log(houses);
  // console.log(places);
  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            value={value}
            onChange={handleChange}
            variant={"fullWidth"}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
          >
            <Tab value="0" label="Hotels" />
            <Tab value="1" label="Houses" />
          </TabList>
        </Box>

        <TabPanel value="0">
          <SwitchItem data={hotels} places={places}/>
        </TabPanel>
        <TabPanel value="1">
          <SwitchItem data={houses}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Switch;
