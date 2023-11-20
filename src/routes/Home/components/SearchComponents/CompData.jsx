import AlertComp from "./AlertComp";
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
          variant="caption2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: 14,
            textAlign: "left",
            marginTop: "6px",
            marginBottom: "7px",
          }}
        >
          {item.address}
        </Typography>
        {item.price ? <Typography>{item.price}$</Typography> : ""}
        <Divider
          sx={{
            border: `.5px solid ${theme.palette.secondary.main}`,
            textAlign: "left",
            marginTop: "7px",
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
            marginTop: "7px",
          }}
        > Кількість місць: {" "} {item.placeN}
        </Typography>
      </Box>
    </Box>
  );
}

export default CompData;