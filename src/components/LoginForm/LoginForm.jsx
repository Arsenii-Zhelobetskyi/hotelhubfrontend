import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authorizationSlice.jsx";
import { useStateContext } from "../../utils/contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/";
function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const authorization = useSelector((state) => state.authorization);
  const { setUser } = useStateContext();

  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");

  const handleEmailChange = (e) => {
    _setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    _setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    //наповнення useContext даними на нашу сесію
    if (authorization.user) {
      setUser(authorization.user);
    }
  }, [authorization.user, setUser]);

  const handleRegistrationClick = () => {
    navigate("/registration");
  };
  return (
      <Dialog open={true}
        PaperProps={{
        style: {
          backgroundColor: "#1D1D1E",
          borderRadius: 10,
        },
      }}>
        <DialogTitle sx={{ color: "#FCFCFD" , height: "65px", paddingTop: "25px"}}>Login Form</DialogTitle>
        <DialogContent sx={{ padding: "15px 20px"}}>
          <DialogContentText sx={{ color: "#777E90", marginBottom: 1.7}}>Please fill out the login form</DialogContentText>
          <TextField sx={{
                        backgroundColor: "rgba(34,38,45,0.88)",
                        borderRadius: 3,
                        }} InputProps={{
                          style: {
                              color: "whitesmoke",
                        }
                      }} InputLabelProps={{
                        style: {
                          color: "white", 
                        },
                      }}
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
          />
          <TextField sx={{
                        backgroundColor: "rgba(34,38,45,0.88)",
                        borderRadius: 3,
                      }} InputProps={{
                          style: {
                              color: "whitesmoke", 
                        }
                      }} InputLabelProps={{
                            style: { color: "white" },
                      }}
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
          />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </DialogContent>
        <DialogActions sx={{ padding: "5px 20px 15px 15px", height: "60px", display: "flex", justifyContent: "space-around" }}>
          <Button sx={{ marginRight: "130px", padding: "7px 15px", alignItem: "left", color: "whitesmoke"}}>Cancel</Button>
        <Button sx={{ padding: "7px 15px" }} variant="contained" onClick={handleRegistrationClick} color="secondary">
            Register
          </Button>
          <Button sx={{ padding: "7px 15px" }} onClick={handleSubmit} variant="contained" color="primary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default LoginForm;
