import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import Body from "./Body.jsx";
import { API_URL } from "../../../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addComment,
} from "../../../../redux/slices/commentsSlice.jsx";
function Reviews({ type, id }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  useEffect(() => {
    dispatch(fetchComments({ type, id }));
  }, []);

  const [body, setBody] = useState("");
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(4);

  const theme = useTheme();
  const handleChange = (e) => {
    setBody(e.target.value);
    if (error) {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body.length === 0) {
      setError(true);
      return;
    }
    dispatch(
      addComment({ comment: { title: "anonymous", body, rating, id }, type })
    );
    setBody("");
  };
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
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Share your thoughts"
            variant="outlined"
            error={error}
            helperText={error && "Please, enter your comment"}
            value={body}
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
                  <IconButton
                    aria-label="toggle password visibility"
                    type="submit"
                  >
                    <SendIcon sx={{ color: theme.palette.primary.main }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </form>
      </Box>
      <Body data={comments.data} />
    </Box>
  );
}

export default Reviews;
