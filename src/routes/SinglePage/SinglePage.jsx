import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useLoaderData } from "react-router-dom";
import { API_URL } from "../../utils/config";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export async function loader({ params }) {
  const req = await fetch(
    `${API_URL}/api/${params.type}s/${params.type}/${params.id}`
  );
  const data = await req.json();
  console.log(data);
  return { data };
}
function SinglePage() {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h2" sx={{ textAlign: "left" }}>
        {data.name}
      </Typography>
      <Typography variant="secondary">{data.address}</Typography>
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
          <Typography variant="secondary">{data.description}</Typography>
          <Typography variant="secondary">{data.contact_inf}</Typography>
          <Typography variant="secondary">{data.placeN}</Typography>
          <Typography variant="secondary">{data.roomN}</Typography>
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
    </Box>
  );
}

export default SinglePage;
