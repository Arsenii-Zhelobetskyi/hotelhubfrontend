import React, { useState, useEffect } from "react";
import { AJAX } from "../../utils/api";
import { API_URL } from "../../utils/config";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";

function PhotoCollection() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    async function fetchHotels() {
      const data = await AJAX(`${API_URL}/api/hotels`); // Adjust the URL as needed
      setHotels(data);
    }
    fetchHotels();
  }, []);
  console.log(hotels);

  return (
    <div>
      <ImageList variant="masonry" cols={3} gap={8}>
        {hotels?.map((hotel) => (
          <ImageListItem key={hotel.id}>
            <img
              srcSet={`${hotel.photo}.jpg?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${hotel.photo}`}
              alt={hotel.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default PhotoCollection;
