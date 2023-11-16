import Switch from "./components/Switch";
import { useLoaderData } from "react-router-dom";
function Catalog() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div style={{ paddingTop: 10 }}>
      <Switch hotels={data[0]} places={data[1]} houses={data[2]} />
    </div>
  );
}

export default Catalog;
