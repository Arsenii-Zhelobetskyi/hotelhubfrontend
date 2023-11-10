import React, { useState, useEffect } from "react";
import { AJAX } from "../../../utils/api";
import { API_URL } from "../../../utils/config";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/";
function HouseCard() {
  const theme = useTheme();
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    // Fetch users from the backend when the component mounts
    async function fetchHouses() {
      const data = await AJAX(`${API_URL}/api/houses`); // Adjust the URL as needed
      setHouses(data);
    }
    fetchHouses();
  }, []);
  console.log(houses);
  return (
    <div>
      <h1>Список домівок:</h1>
      <Grid container spacing={4}>
        {houses?.map((house) => (
          <Grid  key={house.id}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: "Transparent",
                border: `1px solid ${theme.palette.secondary.main}`,
                borderRadius: "30px",
                width: "310px",
                height: "330px",
              }}
            >
              <CardMedia
                sx={{ my: 0 }}
                component="img"
                height="180"
                image={`${house.photo.main}`}
                alt="House photo"
              />
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: "bold",
                  my: 0,
                }}
              >
                {house.name}
              </Typography>
              <Typography
                sx={{
                  color: "#D0CBDC",
                  fontSize: 14,
                  textAlign: "right",
                  my: -1,
                }}
              >
                {" "}
                {house.address}{" "}
              </Typography>
              <Typography sx={{ color: "#ffffff", my: 0 }}>
                {house.price}$
              </Typography>
              <Divider sx={{ my: 0 }} />
              {house.status === "free" ? (
                <Alert
                  sx={{
          
                    bottom: 15,
                    left: 20,
                    fontSize: 14,
                    padding: "3px 10px",
                  }}
                  color="success"
                  variant="soft"
                  size="ms"
                >
                  Вільний
                </Alert>
              ) : (
                <Alert
                  sx={{
                    bottom: 15,
                    left: 20,
                    fontSize: 14,
                    padding: "3px 10px",
                  }}
                  color="danger"
                  variant="soft"
                  size="ms"
                >
                  Занято
                </Alert>
              )}
              <Typography
                sx={{
              
                  bottom: 17,
                  right: 20,
                  fontSize: 14,
                }}
              >
                Кількість місць: {house.placeN}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HouseCard;
