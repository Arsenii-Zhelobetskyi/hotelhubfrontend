import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/config";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const req = await fetch(
    `${API_URL}/api/reservation/${params.user_id}`
  );
  const history = await req.json();
  console.log(history);
  return { history };
}

const columns = [
  { field: 'id', headerName: ' ID', width: 100 },
  { field: 'start_date', headerName: 'Start Date', type: 'date', width: 200, valueGetter: (params) => new Date(params.row.start_date),},
  { field: 'end_date', headerName: 'End Date', type: 'date', width: 200, valueGetter: (params) => new Date(params.row.end_date), },
  { field: 'status', headerName: 'Status', type: 'text', width: 170 },
  { field: 'buildMethod', headerName: 'Build Method', type: 'text', width: 190, valueGetter: (params) => {
        const payType = String(params.row.payCheck.payType);

        if (payType === 'debit_card') {
            return 'Debit Card';
        } else if (payType === 'cash') {
            return 'Cash';
        } else if (payType === 'online_wallet') {
            return 'Online Wallet';
        } else {
            return 'no'; 
        }
      },
  },
  { field: 'sum', headerName: 'Total', type: 'number', width: 160, valueGetter: (params) => (Number(params.row.sum)) + ".00$" },
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
          <DataGrid sx={{ paddingRight: 2, paddingLeft: 2, fontSize: 16, boxShadow: 2, border: 2, borderColor: 'primary.light', '& .MuiDataGrid-cell:hover': { color: 'primary.main',},}}
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