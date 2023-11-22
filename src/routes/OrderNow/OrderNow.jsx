import { Typography, Button, Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GridData from "../Catalog/components/GridData";
import { useTheme } from "@emotion/react";
import { fetchSinglePage } from "../../redux/slices/singlePageSlice";
function orderNow() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const theme = useTheme();
  const { type, id } = useParams();
  const data = useSelector((state) => state.singlePage.data);
  useEffect(() => {
    dispatch(fetchSinglePage({ type, id }));
  }, []);
  // const houses = useSelector((state) => state.houses);
  // const hotels = useSelector((state) => state.hotels);
  console.log(type, id);
  // console.log(houses);
  console.log(data);
  // console.log(hotels);
  return (
    <div>
      <Typography variant="hero">Order now</Typography>
      <Box>
        {data.length !== 0 ? (
          <GridData item={data} places={undefined} theme={theme} type={type} />
        ) : null}
      </Box>
      <Button color="secondary" onClick={() => navigateTo(`/home`)}>
        Go home
      </Button>
      <Button>Submit</Button>
    </div>
  );
}

export default orderNow;
