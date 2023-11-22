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
function orderNow() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const theme = useTheme();
  const { type, id } = useParams();
  const data = useSelector((state) => state.singlePage.data);
  const handleStartDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date.format("YYYY-MM-DD"),
    }));
  };
  const handleEndDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: date.format("YYYY-MM-DD"),
    }));
  };

  useEffect(() => {
    dispatch(fetchSinglePage({ type, id }));
  }, []);
  const [formData, setFormData] = useState({
    startDate: `${dayjs().format("YYYY-MM-DD")}`,
    endDate: `${dayjs().format("YYYY-MM-DD")}`,
  });
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
      <Typography variant="headline3" sx={{ my: "20px" }}>
        choose your date:
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", my: "20px" }}>
        <Calendar
          data={formData}
          value={formData.startDate}
          label={"Start Date"}
          name={"startDate"}
          minDate={undefined}
          setData={handleStartDate}
        />
        <Typography variant="headline3"> – </Typography>
        <Calendar
          data={formData}
          value={formData.endDate}
          label={"End Date"}
          name={"endDate"}
          minDate={dayjs(formData.startDate)}
          setData={handleEndDate}
        />
      </Box>
      <Typography variant="hero" sx={{ my: "20px" }}>
        You have ordered
      </Typography>

      <Box>
        {data.length !== 0 ? (
          <GridData item={data} places={undefined} theme={theme} type={type} />
        ) : null}
      </Box>

      <Box sx={{ my: "20px" }}>
        <Button color="secondary" onClick={() => navigateTo(`/home`)}>
          Go home
        </Button>
        <Button>Submit</Button>
      </Box>
    </Box>
  );
}

export default orderNow;
