import { useState } from "react";

import { useTheme } from "@mui/material/styles";

import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Rating,
  Divider,
} from "@mui/material";

import { formatDistanceToNow } from "date-fns";

function Body({ data, orderBy, setOrderBy }) {
  const theme = useTheme();

  const options = [
    ["", "None"],
    [JSON.stringify({ field: "date", algorithm: "desc" }), "Newest"],
    [JSON.stringify({ field: "date", algorithm: "asc" }), "Oldest"],
    [JSON.stringify({ field: "rating", algorithm: "desc" }), "Best"],
    [JSON.stringify({ field: "rating", algorithm: "asc" }), "Worst"],
  ];
  const handleChange = (event) => {
    setOrderBy(event.target.value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "48px",
          marginBottom: "32px",
          alignItems: "center",
        }}
      >
        <Typography variant="headline2">Comments</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Sort by</InputLabel>

          <Select
            defaultValue={options[0][0]}
            value={orderBy}
            onChange={handleChange}
            sx={{
              [`& fieldset`]: {
                border: `1px solid ${theme.palette.secondary.main}`,
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {data?.map((comment) => (
          <Box key={comment.id}>
            <Box></Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="headline3">{comment.title}</Typography>
              <Rating name="read-only" value={comment.rating} readOnly />
            </Box>
            <Typography variant="body">{comment.body}</Typography>

            <Typography
              variant="body"
              sx={{ marginTop: "10px", display: "flex" }}
            >
              {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
            </Typography>
            <Divider
              sx={{
                border: `0.5px solid ${theme.palette.secondary.main}`,
                marginTop: "20px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Body;

// <Select
//   value={orderBy}
//   label="Age"
//   onChange={handleChange}
//   sx={{
//     [`& fieldset`]: {
//       border: `1px solid ${theme.palette.secondary.main}`,
//     },
//   }}
// >
//   <MenuItem value={1}>
//     <em>None</em>
//   </MenuItem>
//   <MenuItem value={2}>test</MenuItem>
//   {/*           {options.map((option) => (
//     <MenuItem key={option.field + option.algorithm} value={option}>
//       {option.algorithm ? option.algorithm.charAt(0).toUpperCase() + option.algorithm.slice(1) : "None"}
//     </MenuItem>
//   ))} */}{" "}
