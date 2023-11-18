import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";

import Grid  from "@mui/material/Unstable_Grid2";

import { useTheme } from "@mui/material/styles";

import GridData from "./GridData";

function GridComp({ data, places = undefined, type }) {
  const theme = useTheme();
  console.log(data);
  return (
    <div>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={5}
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
              <GridData item={item} theme={theme} places={places} type={type} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GridComp;
