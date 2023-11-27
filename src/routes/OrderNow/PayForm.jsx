import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authorizationSlice.jsx";
import { useStateContext } from "../../utils/contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/";
import dayjs from "dayjs";

function PayForm({ onCancel, onConfirm, amount, orderDate }) {
    const day = dayjs(orderDate).format("YYYY-MM-DD, HH:mm");
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const handleSubmit = (e) => {
        onConfirm({ paymentMethod, amount, orderDate });
    };

    const handleCancel = (e) => {
        onCancel();
    }

  
  return (
      <Dialog open={true}
        PaperProps={{
        style: {
          backgroundColor: "#1D1D1E",
          borderRadius: 10,
        },
      }}>
        <DialogTitle sx={{ color: "#FCFCFD" , height: "85px", padding: "25px 0", fontSize: 24}}>Payment Form</DialogTitle>
        <DialogContent sx={{ padding: "20px 30px"}}>
              <DialogContentText sx={{ color:  "#FCFCFD", marginBottom: 1.7, textAlign: "left" }}>Your order`s sum: {amount}$</DialogContentText>
              <DialogContentText sx={{ color:  "#FCFCFD", marginBottom: 1.7, textAlign: "left"  }}>Order date: {day}</DialogContentText>

                <FormControl component="fieldset" sx={{ margin: "12px" }}>
                    <FormLabel component="legend" sx={{ color: "#777E90", marginBottom: "8px" }}>Choose your payment method</FormLabel>
                    <RadioGroup
                        aria-label="paymentMethod"
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                        <FormControlLabel value="debit_card" control={<Radio />} label="Debit Card" />
                        <FormControlLabel value="online_wallet" control={<Radio />} label="Online Wallet" />
                    </RadioGroup>
                </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: "5px 20px 15px 15px", height: "60px", display: "flex", justifyContent: "space-around" }}>
          <Button sx={{ marginRight: "130px", padding: "7px 15px", alignItem: "left", color: "whitesmoke"}} color="secondary" onClick={handleCancel}> Cancel </Button>
          <Button sx={{ padding: "7px 15px" }} onClick={handleSubmit} variant="contained" color="primary"> Confirm </Button>
        </DialogActions>
      </Dialog>
  );
}

export default PayForm;