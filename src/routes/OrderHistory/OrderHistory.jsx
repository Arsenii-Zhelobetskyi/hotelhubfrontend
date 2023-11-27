import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";
import { fetchOrders } from "../../redux/slices/ordersSlice";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component from MUI

const columns = [
  { field: "id", headerName: " ID", width: 100 },
  {
    field: "start_date",
    headerName: "Start Date",
    type: "date",
    width: 200,
    valueGetter: (params) => new Date(params.row.start_date),
  },
  {
    field: "end_date",
    headerName: "End Date",
    type: "date",
    width: 200,
    valueGetter: (params) => new Date(params.row.end_date),
  },
  { field: "status", headerName: "Status", type: "text", width: 170 },
  {
    field: "payMethod",
    headerName: "Pay Method",
    type: "text",
    width: 190,
    valueGetter: (params) => {
      const payType = String(params?.row?.payCheck?.payType);

      if (payType === "debit_card") {
        return "Debit Card";
      } else if (payType === "cash") {
        return "Cash";
      } else if (payType === "online_wallet") {
        return "Online Wallet";
      } else {
        return "no";
      }
    },
  },
  {
    field: "sum",
    headerName: "Total",
    type: "number",
    width: 160,
    valueGetter: (params) => Number(params.row.sum) + ".00$",
  },
];

function OrderHistory() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const orders = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchOrders({ user_id }));
  }, []);
  if (orders.isLoading) {
    return (
      <div>
        <h1>My Order History</h1>
        <Box sx={{ height: 400, width: `100%`, marginTop: 4 }}>
          <Skeleton variant="rectangular" height={400} />
        </Box>
      </div>
    );
  }
  return (
    <div>
      <h1>My Order History</h1>
      {orders?.data && (
        <Box sx={{ height: 400, width: `100%`, marginTop: 4 }}>
          <DataGrid
            sx={{
              paddingRight: 2,
              paddingLeft: 2,
              fontSize: 16,
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": { color: "primary.main" },
              "& .MuiDataGrid-sortIcon": { opacity: 1, color: "white" },
              "& .MuiDataGrid-menuIconButton": { opacity: 1, color: "white" },
            }}
            rows={orders.data}
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
      )}
    </div>
  );
}

export default OrderHistory;
