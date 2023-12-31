import { Box, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AccessibleIcon from "@mui/icons-material/InsertInvitation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import dayjs from "dayjs";

function Calendar({ data, setData, value, label, name, minDate }) {
  const theme = useTheme();
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            backgroundColor: theme.palette.background.grey,
            border: `1px solid ${theme.palette.secondary.dark}`,
            borderRadius: 2,
            width: "80%",
            svg: { color: "text.primary" },
            label: { color: "text.primary" },
            input: { color: "text.primary" },
          }}
          label={label}
          disablePast
          format="YYYY-MM-DD"
          name={name}
          minDate={minDate}
          value={dayjs(value)}
          onChange={(date) => setData(date)}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default Calendar;
