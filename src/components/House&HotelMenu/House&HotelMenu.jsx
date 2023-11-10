import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import HotelCard from "../HotelCard.jsx";
import HouseCard from "../HouseCard.jsx";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function HouseHotelTabMenu() {
  const [value, setValue] = useState(0); // значення вкладки за замовчуванням

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div style={{ margin: "20px 300px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant={"fullWidth"}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
          >
            <Tab
              sx={{ color: "#ffffff" }}
              value={0}
              label="Hotels"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ color: "#ffffff" }}
              value={1}
              label="Houses"
              {...a11yProps(1)}
            />
          </Tabs>
        </div>

        <CustomTabPanel value={value} index={0}>
          <HotelCard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <HouseCard />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default HouseHotelTabMenu;
