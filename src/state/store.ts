import { configureStore } from "@reduxjs/toolkit";
import airportSearchReducer from "./flightSearch/airportSearchSlice";

export const store = configureStore({
  reducer: {
    airportSearch: airportSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
