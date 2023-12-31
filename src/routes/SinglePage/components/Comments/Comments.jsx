import { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Rating,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
} from "@mui/material";
import { useStateContext } from "../../../../utils/contexts/ContextProvider.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addComment,
} from "../../../../redux/slices/commentsSlice.jsx";

import Body from "./Body.jsx";

function Comments({ type, id }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments);
  const [body, setBody] = useState(""); // comment body
  const [error, setError] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [rating, setRating] = useState(4);
  const [currentPage, useCurrentPage] = useState(1);
  const [currentLimit, useCurrentLimit] = useState(5);
  // const userName = useSelector((state)=> state.authorization.user.name)
  const { user } = useStateContext();
  const userName = user.name;
  console.log(userName, "userName");
  useEffect(() => {
    dispatch(
      fetchComments({
        type,
        id,
        page: currentPage,
        limit: currentLimit,
        orderBy,
      })
    );
  }, [currentPage, orderBy]);
  const handleInputChange = (e) => {
    setBody(e.target.value);
    if (error) {
      setError(false);
    }
  };
  const handlePagination = (e, value) => {
    useCurrentPage(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body.length === 0) {
      setError(true);
      return;
    }
    dispatch(
      addComment({ comment: { title: userName, body, rating, id }, type })
    );
    setOrderBy("");
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
            onChange={handleInputChange}
          />
        </form>
      </Box>
      <Body
        data={comments.data}
        sort={orderBy}
        setOrderBy={setOrderBy}
        type={type}
      />
      {comments.data.length !== 0 && (
        <Pagination
          count={Math.ceil(comments.quantity / currentLimit)}
          color="primary"
          sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
          onChange={handlePagination}
        />
      )}
    </Box>
  );
}

export default Comments;
