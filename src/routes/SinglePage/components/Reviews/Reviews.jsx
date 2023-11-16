import React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Body from "./Body.jsx";

function Reviews() {
  const [rating, setRating] = useState(4);
  const theme = useTheme();

  return (
    <Box sx={{ marginTop: "100px", lg: { width: "729px" } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="headline2">Add a review</Typography>
          <Typography variant="caption1">Be the first to review</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              if (newValue === null) {
                return;
              }
              setRating(newValue);
            }}
          />
          <Typography variant="headline2">{rating}.0</Typography>
        </Box>
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Share your thoughts"
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "40px",
            borderRadius: "16px",
            [`& fieldset`]: {
              border: `1px solid ${theme.palette.secondary.main}`,
              borderRadius: "16px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Body />
    </Box>
  );
}

export default Reviews;
