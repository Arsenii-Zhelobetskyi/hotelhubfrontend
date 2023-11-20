import Pagination from "@mui/material/Pagination";
import ResComp from "./ResComp.jsx"
import { Box, Typography } from "@mui/material";

function Results( resData, type) {
  console.log(resData.data);
  let value;
  if (type === "room") {
    value = "0";
  } else {value = "1";}
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
        marginBottom: "200px",
      }}
    > <Typography variant="headline2"
          sx={{
            marginTop: 15,
            textAlign: "left",
            marginBottom: 3,
          }}> Search Results </Typography>
      {value === "0" ? (
        <ResComp data={resData.data} type="room" />
      ) : (
        <ResComp data={resData.data} type="house" />
      )}
      <Pagination count={10} color="primary" />
    </Box>
  );
}

export default Results;
