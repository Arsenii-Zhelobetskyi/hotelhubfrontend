import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

function CompData({ item, theme, type }) {
  const navigateTo = useNavigate();
  const handleNavigate = (path) => {
    navigateTo(path);
  };
  return (
    <Box
    //   onClick={() => handleNavigate(`/catalog/${type}/${item.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <Box
        component="img"
        sx={{
          height: 190,
          width: "100%",
        }}
        alt="The house from the offer."
        src={`${item.photo.main ? item.photo.main : item.photo.data[0]}`}
      />
      <Box sx={{ padding: "24px" }}>
        <Typography
          variant="headline3"
          sx={{
            textAlign: "left",
          }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="caption1"
          sx={{
            textAlign: "left",
            marginTop: "6px",
            marginBottom: "7px",
          }}
        > {item.address} </Typography>
        
        <Typography
          variant="caption2"
          sx={{
            textAlign: "left",
            marginTop: "9px",
          }}
        > {item.description} </Typography>
          
        <Divider
          sx={{
            border: `.5px solid ${theme.palette.secondary.main}`,
            textAlign: "left",
            margin: "15px 0 10px 0",
          }}
        />

         {item.price ? <Typography sx={{ marginBottom: -1}}>{item.price}$</Typography> : ""}
        
        
      </Box>
    </Box>
  );
}

export default CompData;