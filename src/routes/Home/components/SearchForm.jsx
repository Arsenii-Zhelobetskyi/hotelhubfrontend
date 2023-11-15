import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/config";
import { AJAX } from "../../../utils/api";
import "./style.css";
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";
import background from "./image.jpg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from "@mui/material/Divider";
import PinDropIcon from '@mui/icons-material/PinDropOutlined';
import PersonIcon from '@mui/icons-material/PersonAddAltOutlined';

export async function loader() {
  const cities = await AJAX(`${API_URL}/api/cities`);
  return cities;
}

function SearchForm() {
  const theme = useTheme();
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

            <Typography sx={{ margin: "20px 50px ", textAlign: "left", fontSize: 18, fontFamily: "monospace", fontStyle: "italic", color: "#DCDEE2E3" }}>Search and Book Your Getaway</Typography>
            <div className="flex-box-left">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="House" sx={{ marginRight: 5 }}/>
                    <FormControlLabel value="male" control={<Radio />} label="Room in hotel" />
                  </RadioGroup>
                </FormControl>
            </div>
          
            <Divider sx={{ border: `.5px solid ${theme.palette.secondary.main}`, margin: "8px 20px", width: "96%" }} />
          
            <div className="flex-box">
              <Box sx={{ display: 'flex', alignItems: 'center',  }}>
                <PinDropIcon sx={{ color: theme.palette.text.primary, marginRight: 1, fontSize: 35, }} />
                <Stack spacing={0} sx={{ width: 270, borderRadius: 2,}}>
                  <Autocomplete sx={{ borderRadius: 2,  }}
                    freeSolo
                    id="free-solo-1"
                    disableClearable
                    options={options}
                    PaperComponent={({ children }) => (
                      <Paper style={{ fontSize: 15, }}>{children}</Paper>
                    )}
                    renderInput={(params) => (
                      <TextField sx={{ backgroundColor: theme.palette.background.dark, borderRadius: 2,}} id="filled-basic" variant="filled" size="small"
                        {...params}
                        label="Location"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                  />
                </Stack>
              </Box>
            
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <PersonIcon sx={{ color: theme.palette.text.primary, marginRight: 1, fontSize: 35, }} />
                <TextField sx={{ backgroundColor: theme.palette.background.dark, border: "2px solid #525C708C", borderRadius: 2, width: 150, }}
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

    )
}

export default SearchForm;