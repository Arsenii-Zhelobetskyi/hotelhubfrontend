import React, { useState, useEffect } from "react";
import { AJAX } from "../../../utils/api";
import { API_URL } from "../../../utils/config";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function HotelCard() {
  const [hotels, setHotels] = useState([]);
  const [places, setOccupiedPlacesByHotel] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    // Fetch users and total occupied places by hotel when the component mounts
    async function fetchData() {
      try {
        const [hotelsData, placesData] = await Promise.all([
          AJAX(`${API_URL}/api/hotels`),
          AJAX(`${API_URL}/api/totalOccupiedPlaces`),
        ]);
        setHotels(hotelsData);
        setOccupiedPlacesByHotel(placesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  console.log(hotels);
  console.log(places);

  return (
    <div>
      <h1>Список готелів:</h1>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={5}
        centered
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {hotels?.map((hotel) => (
          <Grid key={hotel.id}>
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
                component="img"
                height="190"
                image={`${hotel.photo}`}
                alt="Hotel photo"
              />
              <Box sx={{ padding: "24px" }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {hotel.name}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: 14,
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                >
                  {hotel.address}
                </Typography>

                <Divider
                  sx={{
                    border: `.5px solid ${theme.palette.secondary.main}`,
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                />
                <Typography
                  sx={{
                    color: "#D0CBDCB8",
                    bottom: 20,
                    right: 20,
                    fontSize: 14,
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                >
                  Кількість вільних місць:
                  {hotel.placeN -
                    (places?.find((item) => item.hotelId === hotel.id)
                      ?.totalPlaces || 0)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HotelCard;
