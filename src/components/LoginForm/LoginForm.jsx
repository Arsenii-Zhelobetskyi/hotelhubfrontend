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
function LoginForm() {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);
  const { setName, setEmail, setToken } = useStateContext();

  const [email, _setEmail] = useState("");
  const [name, _setName] = useState("");
  const [password, _setPassword] = useState("");

  const [error, setError] = useState(null);
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
    if (authorization.name) {
      setEmail(authorization.name.email);
      setToken(authorization.name.token);
    }
  }, [authorization.name, setEmail, setToken]);
  return (
    <Dialog open={true}>
      <DialogTitle>Login Form</DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill out the login form.</DialogContentText>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginForm;
