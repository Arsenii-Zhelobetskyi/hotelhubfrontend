import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import SearchForm from "./components/SearchForm"
function Home() {
  return (
    <div>
      <SearchForm />
      <div> it is a home page</div>
      <Button variant="contained" color="primary">
        it is a button
      </Button>
      <Button variant="contained" color="secondary">
        it is a button
      </Button>
    </div>
  );
}

export default Home;
