import commentsSlice from "./slices/commentsSlice";
import hotelsSlice from "./slices/hotelsSlice";
import housesSlice from "./slices/housesSlice";
import roomsSlice from "./slices/roomsSlice";
import singlePageSlice from "./slices/singlePageSlice";
import searchSlice from "./slices/searchSlice";
import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "./slices/authorizationSlice";
import ordersSlice from "./slices/ordersSlice";
const store = configureStore({
  reducer: {
    hotels: hotelsSlice,
    houses: housesSlice,
    rooms: roomsSlice,
    singlePage: singlePageSlice,
    comments: commentsSlice,
    search: searchSlice,
    authorization: authorizationSlice,
    orders: ordersSlice,
  },
});
export default store;
