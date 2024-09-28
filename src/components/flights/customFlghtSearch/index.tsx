import { Box } from "@mui/material";
import AutoCompeteAirport, { OptionT } from "../autocompleteAirportSearch";
import CustomDatePicker from "../datePicker";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  FLIGHT_SEARCH_PARAMS,
  MULTY_CITY_PARAMS,
  TRIP_TYPE,
} from "../../../dataInterface/stateInterface/enums";
import { assignDataToLegs } from "../../../state/flightSearch/airportSearchSlice";

interface IFlightSearch {
  id: number;
  isDisabled: boolean;
  minDate?: string;
  maxDate?: string;
}

export function CustomFlightSearch(props: IFlightSearch) {
  const state = useSelector((state: RootState) => state.airportSearch);

  const dispatch = useDispatch<AppDispatch>();

  const autocompleteHandler = (label: string, value: any, id: number) => {
    let data;
    if (state.tripType !== TRIP_TYPE.Multy_City) {
      if (label === "from") {
        data = {
          [FLIGHT_SEARCH_PARAMS.Origin]: (value as OptionT).skyId,
          [FLIGHT_SEARCH_PARAMS.OriginEntity]: (value as OptionT).entityId,
        };
      } else {
        data = {
          [FLIGHT_SEARCH_PARAMS.Destination]: (value as OptionT).skyId,
          [FLIGHT_SEARCH_PARAMS.DestinationEntity]: (value as OptionT).entityId,
        };
      }
    }
    if (label === "from") {
      data = {
        [MULTY_CITY_PARAMS.OriginId]: (value as OptionT).skyId,
        [FLIGHT_SEARCH_PARAMS.OriginEntity]: (value as OptionT).entityId,
      };
    } else {
      data = {
        [MULTY_CITY_PARAMS.DestinationId]: (value as OptionT).skyId,
        [FLIGHT_SEARCH_PARAMS.DestinationEntity]: (value as OptionT).entityId,
      };
    }
    dispatch(assignDataToLegs({ id, data }));
  };

  return (
    <Box className="search-container">
      <Box className="flex-row">
        <Box className="input-wrapper">
          <AutoCompeteAirport
            label="from"
            isDisabled={state.remoteFlightsData.isLoading}
            id={props.id}
            assignValue={autocompleteHandler}
          />
        </Box>
        <Box className="input-wrapper">
          <AutoCompeteAirport
            label="to"
            isDisabled={state.remoteFlightsData.isLoading}
            id={props.id}
            assignValue={autocompleteHandler}
          />
        </Box>
      </Box>
      <Box className="flex-row">
        <Box className="input-wrapper">
          <CustomDatePicker
            id={props.id}
            label="Departure"
            disablePast={true}
            isDisabled={state.remoteFlightsData.isLoading || props.isDisabled}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />
        </Box>
        {state.tripType === TRIP_TYPE.Round_Trip ? (
          <Box className="input-wrapper">
            <CustomDatePicker
              id={props.id}
              label="Return"
              disablePast={true}
              isDisabled={state.remoteFlightsData.isLoading}
              minDate={state.legs[0].date}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
