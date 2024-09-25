import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FlightService from "../../services/FlightService";
import IRemoteData, {
  IAirportSearchData,
} from "../../dataInterface/airportsearchData";
import { stringifyingErrMsg } from "../../helpers/stringifyErrorMsgs";
import { FLIGHT_SEARCH_PARAMS } from "../../dataInterface/stateInterface/flightSearchInterface";
import { FlightDataResponse } from "../../dataInterface/stateInterface/remoteDataInterface/flightsDataInterface";
const service = new FlightService();

const initialState: {
  flightParams: {
    [key: string]: string;
  };
  remoteAirportSearch: {
    [key: string]: IRemoteData<IAirportSearchData | null>;
  };
  remoteFlightsData: IRemoteData<FlightDataResponse | null>;
} = {
  remoteAirportSearch: {
    [FLIGHT_SEARCH_PARAMS.Origin]: {
      data: null,
      isLoading: false,
      error: "",
    },
    [FLIGHT_SEARCH_PARAMS.Destination]: {
      data: null,
      isLoading: false,
      error: "",
    },
  },
  remoteFlightsData: {
    data: null,
    isLoading: false,
    error: "",
  },
  flightParams: {
    [FLIGHT_SEARCH_PARAMS.Origin]: "",
    [FLIGHT_SEARCH_PARAMS.Destination]: "",
    [FLIGHT_SEARCH_PARAMS.OriginEntity]: "",
    [FLIGHT_SEARCH_PARAMS.DestinationEntity]: "",
    [FLIGHT_SEARCH_PARAMS.Date]: "",
  },
};

const flightsSearchSlice = createSlice({
  name: "flightsSearch",
  initialState,

  reducers: {
    assignSearchParams: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.flightParams = { ...state.flightParams, ...action.payload };
    },
    // resetRemoteSearch: (state) => {
    //   state.remoteAirportSearch = null;
    //   state.isLoading = false;
    //   state.error = "";
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(airportSearchAsync.pending, (state, action) => {
      const key = action.meta.arg.key;
      state.remoteAirportSearch[key].isLoading = true;
    });
    builder.addCase(
      airportSearchAsync.fulfilled,
      (
        state,
        action: PayloadAction<{ data: IAirportSearchData; key: string }>
      ) => {
        const key = action.payload.key;
        state.remoteAirportSearch[key].isLoading = false;
        if (!action.payload.data.data.length) {
          state.remoteAirportSearch[key].data = null;
          return;
        }
        state.remoteAirportSearch[key].data = action.payload.data;
      }
    );
    builder.addCase(airportSearchAsync.rejected, (state, action) => {
      const key = action.meta.arg.key;
      state.remoteAirportSearch[key].isLoading = false;
      state.remoteAirportSearch[key].error = action.payload as string;
    });

    builder.addCase(flightSearchAsync.pending, (state) => {
      state.remoteFlightsData.isLoading = true;
    });
    builder.addCase(
      flightSearchAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.remoteFlightsData.isLoading = false;
        state.remoteFlightsData.data = action.payload;
        console.log(action.payload);
      }
    );
    builder.addCase(flightSearchAsync.rejected, (state, action) => {
      state.remoteFlightsData.isLoading = false;
      state.remoteFlightsData.error = action.payload as string;
    });
  },
});

export const airportSearchAsync = createAsyncThunk(
  "airportSearch/searchAsync",
  async (
    { value, key }: { value: string; key: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await service.searchAirport(value);
      return { data: response, key: key };
    } catch (error: any) {
      const errMsg: string = stringifyingErrMsg(error);
      return rejectWithValue(errMsg);
    }
  }
);

export const flightSearchAsync = createAsyncThunk(
  "flightSearch/serachAsync",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      console.log({ state });
      const params = state.airportSearch.flightParams;
      const response = await service.searchFlight(params);
      return { response };
    } catch (error) {
      const errMsg: string = stringifyingErrMsg(error);
      return rejectWithValue(errMsg);
    }
  }
);

export const { assignSearchParams } = flightsSearchSlice.actions;

export default flightsSearchSlice.reducer;
