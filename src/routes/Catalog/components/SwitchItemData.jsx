import AlertComp from "./AlertComp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
function SwitchItemData({ item, theme, places, type }) {
  const navigateTo = useNavigate();
  const handleNavigate = (path) => {
    navigateTo(path);
  };
  return (
    <Box
      onClick={() => handleNavigate(`/catalog/${type}/${item.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        height="190"
        image={`${item.photo.main ? item.photo.main : item.photo}`}
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
        {item.price ? <Typography>{item.price}$</Typography> : ""}
        <Divider
          sx={{
            border: `.5px solid ${theme.palette.secondary.main}`,
            textAlign: "left",
            marginTop: "10px",
          }}
        />
        <AlertComp status={item.status} />
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
            (places?.find((el) => el.hotelId === item.id)?.totalPlaces || 0)}
        </Typography>
      </Box>
    </Box>
  );
}

export default SwitchItemData;
