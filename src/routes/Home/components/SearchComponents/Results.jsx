import ResComp from "./ResComp.jsx"
import { Box, Typography } from "@mui/material";

function Results(resData) {  
  let title = (resData.data.length > 0) ? "Search Results" : "Sorry, no matching results...";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
        marginBottom: "200px",
      }}
    >

      <Typography variant="headline2"
          sx={{
            marginTop: 15,
            textAlign: "left",
            marginBottom: 3,
        }}> {title} </Typography>
        
      <ResComp data={resData.data} />
      
    </Box>
  );
}

export default Results;
