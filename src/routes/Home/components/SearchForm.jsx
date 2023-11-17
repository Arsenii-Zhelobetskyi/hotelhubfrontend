// import React, { useState, useEffect } from "react";
import "./style.css";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();

  const iconStyles = css`
    color: ${theme.palette.text.primary};
    margin-right: 1px;
    font-size: 35px;
  `;

  const StyledIcon1 = styled(PersonIcon)`
    ${iconStyles}
  `;
  const StyledIcon2 = styled(PinDropIcon)`
    ${iconStyles}
  `;

  const data = useLoaderData();

  console.log(data);
  const options = data.map((city) => `${city.name}, ${city.country}`);

  return (
    <Box className="container">
      <article className="article">
        <img src={background} alt="House photo" className="image" />
        <h1 className="title">
          Welcome, <br /> dear <br /> traveler!
        </h1>

        <form className="form">
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

            <Button sx={{ width: "18%" }} variant="contained" color="primary">
              <TravelIcon
                sx={{
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
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="House"
                  sx={{ marginRight: 5 }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Room in hotel"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <Divider sx={{ margin: "8px 20px", width: "96%" }} />

          <div className="flex-box">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StyledIcon2
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
                  id="free-solo-1"
                  disableClearable
                  options={options}
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
                  format="YYYY-MM-DD"
                  label="Start Date"
                  defaultValue={dayjs()}
                />
              </LocalizationProvider>
            </Box>

            <Typography variant="headline3"> – </Typography>

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
              <StyledIcon1
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
                label="Number of guests"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                defaultValue="1"
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
