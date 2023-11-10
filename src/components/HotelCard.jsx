import React, { useState, useEffect } from "react";
import { AJAX } from "../utils/api";
import { API_URL } from "../utils/config";
import Typography from "@mui/joy/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/material/Unstable_Grid2";

function HotelCard() {
  const [hotels, setHotels] = useState([]);
  const [places, setOccupiedPlacesByHotel] = useState([]);

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
      <Grid container spacing={4}>
        {hotels?.map((hotel) => (
          <Grid item xs={3} key={hotel.id}>
            {/*  <Card size="lg" variant="outlined" sx={{ bgcolor: "#23262F", color: "#ffffff", borderColor: "#777E90", width: "250px", height: "330px" }}>
              <CardMedia sx={{ my: 0 }}
                component="img"
                height="190"
                image={`${hotel.photo}`}
                alt="Hotel photo"
              />
              <Typography sx={{ color: "#ffffff", fontSize: 20, fontWeight: 'bold', my: 0 }}>{hotel.name}</Typography>
              <Typography sx={{ color: "#D0CBDC", fontSize: 14, textAlign: 'right' }}>  {hotel.address} </Typography>

              <Divider sx={{ my: 1 }} />
              <Typography sx={{ color: "#D0CBDCB8", position: "absolute", bottom: 20, right: 20, fontSize: 14 }}>
                Кількість вільних місць: {(hotel.placeN - (places?.find(item => item.hotelId === hotel.id)?.totalPlaces || 0))}
              </Typography>
            </Card> */}
            <Card></Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HotelCard;
