import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/config";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const req = await fetch(
    `${API_URL}/api/orderList/${params.user_id}`
  );
  const orderList = await req.json();
  console.log(orderList);
  return { orderList };
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'date', headerName: 'Data', type: 'data', width: 100, editable: false },
  { field: 'total', headerName: 'Total', type: 'number', width: 110, editable: true },
  { field: 'status', headerName: 'Status', type: 'number', width: 110, editable: true },
  { field: 'buildMethod', headerName: 'Build Method', type: 'text', width: 130 },
];

function OrderHistory() {

  const theme = useTheme();

  const [rows, setRows] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { orderList } = await useLoaderData();
        setRows(orderList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // const { orderList } = useLoaderData();
  // console.log(orderList);

  return (
    <div>
      <h1>My Order History</h1>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
      
    </div>
  );
}

export default OrderHistory;