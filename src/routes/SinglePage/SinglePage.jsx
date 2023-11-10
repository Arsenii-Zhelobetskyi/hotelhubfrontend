import { useLoaderData } from "react-router-dom";
import { API_URL } from "../../utils/config";
export async function loader({ params }) {
  const req = await fetch(`${API_URL}/api/hotel/${params.id}`);
  const data = await req.json();
  return { data };
}
function SinglePage() {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1>{data.name}</h1>
      <div>{data.address}</div>
      <div>
        <img src={data.photo} />
      </div>
      <p>{data.description}</p>
      <div>{data.contact_inf}</div>
      <div>{data.placeN}</div>
      <div>{data.roomN}</div>
    </div>
  );
}

export default SinglePage;
