import { useState } from "react";
import "./style.css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useLoaderData } from "react-router-dom";
import background from "./image.jpg";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Paper } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import PinDropIcon from "@mui/icons-material/PinDropOutlined";
import PersonIcon from "@mui/icons-material/PersonAddAltOutlined";
import TravelIcon from '@mui/icons-material/TravelExploreTwoTone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TravelIcon from "@mui/icons-material/TravelExploreTwoTone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import styled from "styled-components";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";


import Box from "@mui/material/Box";

function SearchForm() {

  const [formData, setFormData] = useState({
    city: '',
    startDate: `${dayjs()}`,
    endDate: '',
    guests: 1,
    accommodationType: 'house',
  });

  const handleAccommodationChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      accommodationType: event.target.value,
    }));
  };
  const handleGuestsChange = (event) => {
    const guests = parseInt(event.target.value, 10);
    setFormData((prevData) => ({
      ...prevData,
      guests: isNaN(guests) ? 1 : guests,
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };


    
  const theme = useTheme();
  
  const data = useLoaderData();

  const options = data.map((city) => `${city.name}, ${city.country}`);

  return (
    <Box className="container">
      <article className="article">
        <img src={background} alt="House photo" className="image" />
        <h1 className="title">
          Welcome, <br /> dear <br /> traveler!
        </h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-box" style={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                padding: "10px 50px 25px 15px",
                textAlign: "left",
                fontSize: 18,
              }}
            >
              {" "}
              Search and Book Your Getaway{" "}
            </Typography>

            <Typography sx={{ padding: "10px 50px 25px 15px", textAlign: "left", fontSize: 18, }}> Search and Book Your Getaway </Typography>
          
              <Button sx={{ width: "18%",}}  variant="contained" color="primary" type="submit">
                <TravelIcon  sx={{
                  color: theme.palette.text.primary,
                  paddingRight: 1,
                  fontSize: 35,
                }}
              />
              <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                {" "}
                Search{" "}
              </Typography>
            </Button>
          </div>

          <div className="flex-box-left">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.accommodationType}
                onChange={handleAccommodationChange}
              >
                <FormControlLabel
                  value="house"
                  control={<Radio />}
                  label="House"
                  sx={{ marginRight: 5 }}
                />
                <FormControlLabel
                  value="hotel"
                  control={<Radio />}
                  label="Room in hotel"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <Divider sx={{ margin: "8px 20px", width: "96%" }} />

          <div className="flex-box">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PinDropIcon
                sx={{
                  color: theme.palette.text.primary,
                  marginRight: 1,
                  fontSize: 35,
                }}
              />
              <Stack spacing={2} sx={{ width: 250, borderRadius: 2 }}>
                <Autocomplete
                  sx={{ borderRadius: 2 }}
                  freeSolo name="location"
                  id="free-solo-1"
                  options={options}
                  filterOptions={(options, { inputValue }) => {
                    const filteredOptions = options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()));
                    return filteredOptions.slice(0, 7);
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ fontSize: 15 }}>{children}</Paper>
                  )}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        backgroundColor: theme.palette.background.dark,
                        borderRadius: 2,
                      }}
                      id="filled-basic" 
                      variant="filled"
                      size="small" 
                      {...params}
                      label="Location"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                  value={formData.city}
                  onChange={(event, value) => {
                    if (value) {
                      const cityName = value.split(',')[0].trim(); 
                      setFormData((prevData) => ({ ...prevData, city: cityName }));
                    }
                  }}
                />
              </Stack>
            </Box>

            <Box sx={{ paddingLeft: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    backgroundColor: theme.palette.background.grey,
                    border: `1px solid ${theme.palette.secondary.dark}`,
                    borderRadius: 2, 
                    width: "80%",
                  }} 
                  format="YYYY-MM-DD"disablePast
                  label="Start Date" name="startDate"
                  value={dayjs()}
                    onChange={(date) => setFormData((prevData) => ({ ...prevData, startDate: date}))}
                />
              </LocalizationProvider>
            </Box>

            <Typography variant="headline3"> – </Typography>

            <Box sx={{paddingRight: 3}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker sx={{backgroundColor: theme.palette.background.grey,
                        border: `1px solid ${theme.palette.secondary.dark}`,
                        borderRadius: 2, 
                        width: "80%",}} 
                        format="YYYY-MM-DD" name="endDate"
                      label="End Date" disablePast 
                      value={dayjs().add(1, 'day')}
                      onChange={(date) => setFormData((prevData) => ({ ...prevData, endDate: date}))}
                    />
                </LocalizationProvider>
            <Box sx={{ paddingRight: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    backgroundColor: theme.palette.background.grey,
                    border: `1px solid ${theme.palette.secondary.dark}`,
                    borderRadius: 2,
                    width: "80%",
                  }}
                  format="YYYY-MM-DD"
                  label="End Date"
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon
                sx={{
                  color: theme.palette.text.primary,
                  marginRight: 1,
                  fontSize: 35,
                }}
              />
              <TextField
                sx={{ backgroundColor: theme.palette.background.dark,
                  borderRadius: 2, width: 130,
                }}
                id="filled-number"
                name="guests" value={formData.guests}
                label="Number of guests"
                type="number" 
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                onChange={handleGuestsChange}
                inputProps={{
                  min: 1,
                  max: 30,
                }}
              />
            </Box>
          </div>
        </form>
      </article>
    </Box>
  );
}

export default SearchForm;
