import { Snackbar, Alert } from "@mui/material";

function AlertComp({ open, setOpen, text }) {
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {text}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AlertComp;
