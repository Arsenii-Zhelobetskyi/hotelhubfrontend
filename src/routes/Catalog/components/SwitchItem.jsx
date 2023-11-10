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
import Alert from "@mui/material/Alert";
function SwitchItem({data,places=undefined}) {

 
  const theme = useTheme();

  console.log(data);
  console.log(places);

  // console.log(hotels);
  // console.log(places);

  return (
    <div>
    
      <Grid
        container
        rowSpacing={5}
        columnSpacing={5}
        centered
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {data?.map((item) => (
          <Grid key={item.id}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: "Transparent",
                border: `1px solid ${theme.palette.secondary.main}`,
                borderRadius: "30px",
                width: "310px",
              }}
            >
              <CardMedia
                component="img"
                height="190"
                image={`${item.photo.main ? item.photo.main: item.photo }`}
                alt="item photo"
              />
              <Box sx={{ padding: "24px" }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: 14,
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                >
                  {item.address}
                </Typography>
                  {item.price? (<Typography>
                {item.price}$
              </Typography>):''}
                <Divider
                  sx={{
                    border: `.5px solid ${theme.palette.secondary.main}`,
                    textAlign: "left",
                    marginTop: "10px",
                  }}
                />
                 {item.status ?  (item.status === "free" ? (
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
              )):''}
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
                  {item.placeN -
                    (places?.find((el) => el.hotelId === item.id)
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

export default SwitchItem;
