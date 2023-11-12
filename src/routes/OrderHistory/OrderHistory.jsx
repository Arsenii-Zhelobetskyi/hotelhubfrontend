import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/config";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const req = await fetch(
    `${API_URL}/api/orderHistory/${params.user_id}`
  );
  const history = await req.json();
  console.log(history);
  return { history };
}

const columns = [
  { field: 'id', headerName: ' ID', width: 130 },
  { field: 'order_date', headerName: 'Date', type: 'date', width: 210, valueGetter: (params) => new Date(params.row.order_date), },
  { field: 'status', headerName: 'Status', type: 'text', width: 190 },
  { field: 'buildMethod', headerName: 'Build Method', type: 'text', width: 220 },
  { field: 'total_amount', headerName: 'Total', type: 'number', width: 190 },
];

function OrderHistory() {

  const theme = useTheme();
  const { history } = useLoaderData();
  console.log(history);

const rows = Object.values(history);

  return (
    <div>
      <h1 >My Order History</h1>
      <Box sx={{ height: 400, width: `100%`, marginTop: 4  }}>
        <DataGrid sx={{ color: `${theme.palette.text.primary}`, paddingRight: 2, paddingLeft: 2, fontSize: 18}}
        rows={rows}
          columns={columns}
          filterMode="server"
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