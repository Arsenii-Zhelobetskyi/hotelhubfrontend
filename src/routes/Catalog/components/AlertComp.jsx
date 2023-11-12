import Alert from "@mui/material/Alert";
function AlertComp({ status }) {
  let alert = null;

  if (status) {
    if (status === "free") {
      alert = (
        <Alert severity="success"
          sx={{
            bottom: 15,
            left: 20,
            fontSize: 14,
            padding: "3px 10px",
          }}
          color="success"
          variant="soft"
          size="ms"
        >
          Вільний
        </Alert>
      );
    } else {
      alert = (
        <Alert severity="error"
          sx={{
            bottom: 15,
            left: 20,
            fontSize: 14,
            padding: "3px 10px",
          }}
          color="error"
          variant="soft"
          size="ms"
        >
          Занято
        </Alert>
      );
    }
  }
  return alert;
}

export default AlertComp;
