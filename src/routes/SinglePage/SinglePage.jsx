import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useLoaderData } from "react-router-dom";
import Reviews from "./components/Reviews/Reviews.jsx";
function SinglePage() {
  const { data } = useLoaderData();

  return (
    <Box sx={{ textAlign: "left", marginBottom: "250px" }}>
      <Typography variant="hero" sx={{ textAlign: "left" }}>
        {data.name}
      </Typography>
      <Typography variant="caption1">{data.address}</Typography>
      <Box
        component="img"
        sx={{
          height: 784,
          width: 856,
          maxHeight: { xs: 900, md: 784 },
          maxWidth: { xs: 856, md: 856 },
          objectFit: "cover",
          borderRadius: "16px",
          marginTop: "20px",
        }}
        alt="The house from the offer."
        src={data.photo.main ? data.photo.main : data.photo}
      />
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="body">{data.description}</Typography>
          <Typography variant="body">{data.contact_inf}</Typography>
          <Typography variant="body">{data.placeN}</Typography>
          <Typography variant="body">{data.roomN}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button variant="contained" color="secondary">
            Save
          </Button>
          <Button variant="contained" color="primary">
            Order now
          </Button>
        </Box>
      </Box>
      <Reviews />
    </Box>
  );
}

export default SinglePage;
