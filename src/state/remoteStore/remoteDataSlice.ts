import IRemoteData, { IAirportSearchData } from "../../dataInterface/airportsearchData";
import { FLIGHT_SEARCH_PARAMS } from "../../dataInterface/stateInterface/enums";
import { FlightDataResponse } from "../../dataInterface/stateInterface/remoteDataInterface/flightsDataInterface";

const initialState: {
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
};
