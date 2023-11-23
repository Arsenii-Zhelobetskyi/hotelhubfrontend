import AlertComp from "./AlertComp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function GridData({ item, isLoading, theme, places, type }) {
  const navigateTo = useNavigate();
  const handleNavigate = (path) => {
    navigateTo(path);
  };

  if (isLoading) {
    return (
      <Card
        variant="outlined"
        sx={{
          bgcolor: "Transparent",
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "30px",
          width: "310px",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={190} />
        <Box sx={{ padding: "24px" }}>
          <Skeleton variant="text" width="70%" height={40} />
          <Skeleton variant="text" width="50%" height={20} />
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "Transparent",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "30px",
        width: "310px",
      }}
    >
      <Box
        onClick={() => handleNavigate(`/catalog/${type}/${item.id}`)}
        sx={{ cursor: "pointer" }}
      >
        <Box
          component="img"
          sx={{
            height: 190,
            width: "100%",
          }}
          alt="The house from the offer."
          src={item?.photo?.data[0]}
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
            variant="caption2"
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
            variant="caption2"
            sx={{
              bottom: 20,
              right: 20,
              fontSize: 14,
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            {item.status ? "Кількість місць: " : "Кількість вільних місць: "}
            {item.placeN -
              (places?.find((el) => el.hotelId === item.id)?.totalPlaces || 0)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default GridData;
