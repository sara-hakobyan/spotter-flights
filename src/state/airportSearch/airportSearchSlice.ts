import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FlightService from "../../services/FlightService";
import { IAirportSearchData } from "../../dataInterface/airportsearchData";
const service = new FlightService();

interface AirportState {
  data: IAirportSearchData | null;
  isLoading: boolean;
  error: string;
}

const initialState: AirportState = {
  data: null,
  isLoading: false,
  error: "",
};

const airportSearchSlice = createSlice({
  name: "airporSearch",
  initialState,
  reducers: {
    search: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(airportSearchAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      airportSearchAsync.fulfilled,
      (state, action: PayloadAction<IAirportSearchData>) => {
        state.data = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const airportSearchAsync = createAsyncThunk(
  "airportSearch/searchAsync",
  async (value: string) => {
    const response = await service.searchAirport(value);
    return response;
  }
);

export default airportSearchSlice.reducer;
