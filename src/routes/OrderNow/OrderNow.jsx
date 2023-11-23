import { Typography, Button, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GridData from "../Catalog/components/GridData";
import { useTheme } from "@emotion/react";
import { fetchSinglePage } from "../../redux/slices/singlePageSlice";
import Calendar from "../../components/Calendar/Calendar";
import dayjs from "dayjs";
import { addOrder } from "../../redux/slices/ordersSlice.jsx";
import { useStateContext } from "../../utils/contexts/ContextProvider";
import AlertComp from "../../components/Alert/AlertComp.jsx";
import { updateRoom } from "../../redux/slices/roomsSlice.jsx";
import { updateHouse } from "../../redux/slices/housesSlice.jsx";

function OrderNow() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { type, id } = useParams();
  const singlePage = useSelector((state) => state.singlePage);
  const { user } = useStateContext();
  const [formData, setFormData] = useState({
    start_date: `${dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]")}`,
    end_date: `${dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]")}`,
  });
  const handleStartDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      start_date: date.format("YYYY-MM-DDTHH:mm:ss[Z]"),
    }));
  };
  const handleEndDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      end_date: date.format("YYYY-MM-DDTHH:mm:ss[Z]"),
    }));
  };
  const handleSubmit = () => {
    const startDate = dayjs(formData.start_date);
    const endDate = dayjs(formData.end_date);

    const quantityOfDays = endDate.diff(startDate, "day");
    console.log(quantityOfDays * singlePage.data.price);
    dispatch(
      addOrder({
        resObj: { type, id },
        order: {
          ...formData,
          status: "active",
          sum: singlePage.data.price * quantityOfDays,
          user_id: user.id,
        },
      })
    );
    if (type === "room")
      dispatch(updateRoom({ ...singlePage.data, status: "occupied" }));
    else if (type === "house")
      dispatch(updateHouse({ ...singlePage.data, status: "occupied" }));

    setOpen(true);
  };

  console.log(singlePage.data);
  useEffect(() => {
    dispatch(fetchSinglePage({ type, id }));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="hero">Order now😺</Typography>
      <Typography variant="headline3">hello {user.name}👋</Typography>
      <Typography variant="headline3">
        You are a few steps away from making an order
      </Typography>
      <Typography variant="headline3">
        Please check your order details below, and add your date
      </Typography>
      <Box sx={{ marginBottom: "20px", marginTop: "15px" }}>
        <Typography variant="caption1">your name: {user.name}</Typography>
        <Typography variant="caption1">your email: {user.email}</Typography>
      </Box>
      <Typography variant="headline3" sx={{ my: "20px" }}>
        choose your date:
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", my: "20px" }}>
        <Calendar
          data={formData}
          value={formData.start_date}
          label={"Start Date"}
          name={"startDate"}
          minDate={undefined}
          setData={handleStartDate}
        />
        <Typography variant="headline3"> – </Typography>
        <Calendar
          data={formData}
          value={formData.end_date}
          label={"End Date"}
          name={"endDate"}
          minDate={dayjs(formData.start_date)}
          setData={handleEndDate}
        />
      </Box>
      <Typography variant="hero" sx={{ my: "20px" }}>
        You have ordered
      </Typography>

      <Box>
        <GridData
          item={singlePage.data}
          isLoading={singlePage.isLoading}
          places={undefined}
          theme={theme}
          type={type}
        />
      </Box>

      <Box sx={{ my: "20px" }}>
        <AlertComp
          open={open}
          setOpen={setOpen}
          text="Your order is success!"
        />
        <Button color="secondary" onClick={() => navigateTo(`/home`)}>
          Go home
        </Button>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </Box>
    </Box>
  );
}

export default OrderNow;
