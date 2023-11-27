import { useState, useEffect } from "react";
import "./style.css";
import {
  useTheme,
  Box,
  Typography,
  TextField,
  Stack,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Divider,
  Button,
  Paper,
} from "@mui/material/";

import { useLoaderData } from "react-router-dom";
import background from "./image.jpg";
import PinDropIcon from "@mui/icons-material/PinDropOutlined";
import PersonIcon from "@mui/icons-material/PersonAddAltOutlined";
import TravelIcon from "@mui/icons-material/TravelExploreTwoTone";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataSearch } from "../../../redux/slices/searchSlice.jsx";
import Results from "./SearchComponents/Results.jsx";

import Calendar from "../../../components/Calendar/Calendar.jsx";

function SearchForm() {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search);

  const [formData, setFormData] = useState({
    city: "",
    startDate: `${dayjs().format("YYYY-MM-DD")}`,
    endDate: `${dayjs().add(1, 'day').format("YYYY-MM-DD")}`,
    guests: 1,
    accommodationType: "house",
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

  const [submitClicked, setSubmitClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date.format("YYYY-MM-DD"),
    }));
  };
  const handleEndDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: date.format("YYYY-MM-DD"),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      fetchDataSearch({
        accommodationType: formData.accommodationType,
        city: formData.city,
        startDate: formData.startDate,
        endDate: formData.endDate,
        guests: formData.guests,
      })
    ).then(() => {
      setSubmitClicked(true);
    });
  };
  useEffect(() => {
    if (submitClicked) {
      // Виконується після завантаження даних та натиску кнопки
      setShowResults(true);

      setSubmitClicked(false);
    }
  }, [searchData, submitClicked]);

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
              {" "}  Search and Book Your Getaway{" "}
            </Typography>

            <Button
              sx={{ width: "18%" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              <TravelIcon
                sx={{
                  color: theme.palette.text.primary,
                  paddingRight: 1,
                  fontSize: 35,
                }}
              />
              <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                {" "} Search{" "}
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
                  value="room"
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
                  freeSolo
                  name="location"
                  id="free-solo-1"
                  options={options}
                  filterOptions={(options, { inputValue }) => {
                    const filteredOptions = options.filter((option) =>
                      option.toLowerCase().includes(inputValue.toLowerCase())
                    );
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
                      const cityName = value.split(",")[0].trim();
                      setFormData((prevData) => ({
                        ...prevData,
                        city: cityName,
                      }));
                    }
                  }}
                />
              </Stack>
            </Box>

            <Calendar
              data={formData}
              value={formData.startDate}
              label={"Start Date"}
              name={"startDate"}
              minDate={undefined}
              setData={handleStartDate}
            />
            <Typography variant="headline3"> – </Typography>
            <Calendar
              data={formData}
              value={formData.endDate}
              label={"End Date"}
              name={"endDate"}
              minDate={dayjs(formData.startDate).add(1, 'day')}
              setData={handleEndDate}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon
                sx={{
                  color: theme.palette.text.primary,
                  marginRight: 1,
                  fontSize: 35,
                }}
              />
              <TextField
                sx={{
                  backgroundColor: theme.palette.background.dark,
                  borderRadius: 2,
                  width: 130,
                }}
                id="filled-number"
                name="guests"
                value={formData.guests}
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

      {showResults && <Results data={searchData.data} />}
    </Box>
  );
}

export default SearchForm;
