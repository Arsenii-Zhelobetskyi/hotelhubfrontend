import ResComp from "./ResComp.jsx"
import { Box, Typography } from "@mui/material";

function Results(resData) {  
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
        }}> Search Results
      </Typography>
        
      <ResComp data={resData.data} />
      
    </Box>
  );
}

export default Results;
