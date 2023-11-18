import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { formatDistanceToNow } from "date-fns";
import { API_URL } from "../../../../utils/config";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import { useParams } from "react-router-dom";
function Body({ data }) {
  const theme = useTheme();
  const [sort, setSort] = useState("");
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  console.log(data);
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
            value={sort}
            label="Age"
            onChange={handleChange}
            sx={{
              [`& fieldset`]: {
                border: `1px solid ${theme.palette.secondary.main}`,
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Newest</MenuItem>
            <MenuItem value={20}>Oldest</MenuItem>
            <MenuItem value={30}>Best</MenuItem>
            <MenuItem value={40}>Worst</MenuItem>
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
