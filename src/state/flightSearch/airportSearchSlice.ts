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

export type Legs = {
  id: number;
  origin: string;
  originEntityId: string;
  destination: string;
  destinationEntityId: string;
  date: string;
};

type InitialState = {
  flightParams: FlightSearchT;
  passangers: {
    adults: number;
    childrens: number;
    infants: number;
  };
  tripType: string;
  totalPassangerCount: number;
  legs: Legs[];
  defaultLeg: Legs;
  legId: number;
  remoteAirportSearch: {
    [key: string]: IRemoteData<IAirportSearchData | null>;
  };
  remoteFlightsData: IRemoteData<FlightDataResponse | null>;
};

const initialState: InitialState = {
  remoteAirportSearch: {
    from: {
      data: null,
      isLoading: false,
      error: "",
    },
    to: {
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
  legId: 0,
  defaultLeg: {
    id: 0,
    origin: "",
    originEntityId: "",
    destination: "",
    destinationEntityId: "",
    date: "",
  },
  legs: [
    {
      id: 0,
      origin: "",
      originEntityId: "",
      destination: "",
      destinationEntityId: "",
      date: "",
    },
  ],
  flightParams: {
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

    assignDataToLegs: (
      state,
      action: PayloadAction<{ id: number; data: any }>
    ) => {
      const dataId = action.payload.id;
      const data = action.payload.data;
      const isData = state.legs.find((l) => l.id === dataId);
      if (isData) {
        const updated = state.legs.map((l) => {
          if (l.id === isData.id) {
            l = { ...l, ...data };
          }
          return l;
        });
        state.legs = updated;
      }
    },

    addNewLegToData: (state) => {
      const newID = state.legId + 1;
      const newLeg = { ...state.defaultLeg, ...{ id: newID } };
      state = {
        ...state,
        legs: [...state.legs, newLeg],
        legId: newID,
      };
      return state;
    },

    removeLegFromData: (state, action: PayloadAction<number>) => {
      const isLeg = state.legs.find((l) => l.id === action.payload);
      if (isLeg) {
        const updated = state.legs.filter((l) => l.id !== isLeg.id);
        state.legs = updated;
      }
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
    resetRemoteFlightData: (state) => {
      state.remoteFlightsData = {
        ...state.remoteFlightsData,
        error: "",
        data: null,
      };
    },
    resetlegsToDefault: (state) => {
      state.legs = state.legs.slice(0, 1);
    },

    resetAirportSearch: (
      state,
      action: PayloadAction<{ key: string; id?: number }>
    ) => {
      state.remoteAirportSearch[action.payload.key].data = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(airportSearchAsync.pending, (state, action) => {
        const key = action.meta.arg.key;
        state.remoteAirportSearch[key].isLoading = true;
      })
      .addCase(
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
      )
      .addCase(airportSearchAsync.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state.remoteAirportSearch[key].isLoading = false;
        state.remoteAirportSearch[key].error = action.payload as string;
      });

    builder
      .addCase(flightSearchAsync.pending, (state) => {
        state.remoteFlightsData.isLoading = true;
      })
      .addCase(
        flightSearchAsync.fulfilled,
        (state, action: PayloadAction<{ response: FlightDataResponse }>) => {
          state.remoteFlightsData.isLoading = false;
          state.remoteFlightsData.data = action.payload.response;
        }
      )
      .addCase(flightSearchAsync.rejected, (state, action) => {
        state.remoteFlightsData.isLoading = false;
        state.remoteFlightsData.error = action.payload as string;
      })

      .addCase(searchFlightsMultiStops.pending, (state) => {
        state.remoteFlightsData.isLoading = true;
      })
      .addCase(
        searchFlightsMultiStops.fulfilled,
        (state, action: PayloadAction<{ response: FlightDataResponse }>) => {
          state.remoteFlightsData.isLoading = false;
          state.remoteFlightsData.data = action.payload.response;
        }
      )
      .addCase(searchFlightsMultiStops.rejected, (state, action) => {
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
  async (data: any, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const params = {
        ...state.airportSearch.flightParams,
        ...state.airportSearch.passangers,
        ...data,
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

export const searchFlightsMultiStops = createAsyncThunk(
  "flightSearchMulty/searchAsync",
  async (data: any, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();

      const params = {
        ...state.airportSearch.flightParams,
        ...state.airportSearch.passangers,
        legs: data,
      };
      const response: FlightDataResponse =
        await service.searchFlightsMultiStops(params);
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
  resetRemoteFlightData,
  assignSearchParams,
  setTripType,
  passangerDecrement,
  passangerIncrement,
  setTotalPassangerCount,
  assignDataToLegs,
  addNewLegToData,
  removeLegFromData,
  resetAirportSearch,
  resetlegsToDefault,
} = flightsSearchSlice.actions;

export default flightsSearchSlice.reducer;
