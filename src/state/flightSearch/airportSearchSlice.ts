import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FlightService from "../../services/FlightService";
import IRemoteData, {
  IAirportSearchData,
} from "../../dataInterface/airportsearchData";
import { stringifyingErrMsg } from "../../helpers/stringifyErrorMsgs";

import { FlightDataResponse } from "../../dataInterface/stateInterface/remoteDataInterface/flightsDataInterface";
import { FlightSearchT } from "../../dataInterface/stateInterface/flightSearchInterface";
import {
  CABIN_CLASS,
  FLIGHT_SEARCH_PARAMS,
  PASSANGER_CATEGORY,
  TRIP_TYPE,
} from "../../dataInterface/stateInterface/enums";
const service = new FlightService();

const initialState: {
  flightParams: FlightSearchT;
  passangers: {
    adults: number;
    childrens: number;
    infants: number;
  };
  tripType: string;
  totalPassangerCount: number;
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
    [FLIGHT_SEARCH_PARAMS.Origin]: "EWR",
    [FLIGHT_SEARCH_PARAMS.Destination]: "LHR",
    [FLIGHT_SEARCH_PARAMS.OriginEntity]: "95565059",
    [FLIGHT_SEARCH_PARAMS.DestinationEntity]: "95565050",
    [FLIGHT_SEARCH_PARAMS.Date]: "2024-10-15",
    [FLIGHT_SEARCH_PARAMS.CabinClass]: CABIN_CLASS.Economy.toLowerCase(),
    [FLIGHT_SEARCH_PARAMS.SortBy]: "best",
    [FLIGHT_SEARCH_PARAMS.Limit]: 5,
  },
  passangers: {
    adults: 1,
    childrens: 0,
    infants: 0,
  },
  tripType: TRIP_TYPE.One_Way,
  totalPassangerCount: 1,
};

const flightsSearchSlice = createSlice({
  name: "flightsSearch",
  initialState,

  reducers: {
    assignSearchParams: (
      state,
      action: PayloadAction<{ [key: string]: string | number }>
    ) => {
      state.flightParams = { ...state.flightParams, ...action.payload };
    },

    setTripType: (state, action: PayloadAction<string>) => {
      state.tripType = action.payload;
    },

    passangerIncrement: (
      state,
      action: PayloadAction<{ key: PASSANGER_CATEGORY }>
    ) => {
      const type = action.payload.key;
      let prevState = state.passangers[type as PASSANGER_CATEGORY];
      state.passangers = { ...state.passangers, [type]: (prevState += 1) };
    },

    passangerDecrement: (
      state,
      action: PayloadAction<{ key: PASSANGER_CATEGORY }>
    ) => {
      const type = action.payload.key;
      let prevState = state.passangers[type as PASSANGER_CATEGORY];
      if (
        prevState === 0 ||
        (prevState === 1 && type === PASSANGER_CATEGORY.Adults)
      ) {
        return;
      }
      state.passangers = { ...state.passangers, [type]: (prevState -= 1) };
    },
    setTotalPassangerCount: (state, action: PayloadAction<number>) => {
      state.totalPassangerCount = action.payload;
    },
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
      (state, action: PayloadAction<{ response: FlightDataResponse }>) => {
        state.remoteFlightsData.isLoading = false;
        state.remoteFlightsData.data = action.payload.response;
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
      const params = {
        ...state.airportSearch.flightParams,
        ...state.airportSearch.passangers,
      };
      const response: FlightDataResponse = await service.searchFlight(params);
      if (!response.status) {
        return rejectWithValue(response?.message);
      }
      return { response };
    } catch (error) {
      const errMsg: string = stringifyingErrMsg(error);
      return rejectWithValue(errMsg);
    }
  }
);

export const {
  assignSearchParams,
  setTripType,
  passangerDecrement,
  passangerIncrement,
  setTotalPassangerCount,
} = flightsSearchSlice.actions;

export default flightsSearchSlice.reducer;
