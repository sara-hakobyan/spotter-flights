import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AirportState {
  value: any;
}

const initialState: AirportState = {
  value: null,
};

const airportSearchSlice = createSlice({
  name: "airporSearch",
  initialState,
  reducers: {
    search: (state) => {},
  },
});

export const airportSearchAsync = createAsyncThunk(
  "airportSearch/searchAsync",
  async (value: string) => {
    
  }
);

export default airportSearchSlice.reducer;
