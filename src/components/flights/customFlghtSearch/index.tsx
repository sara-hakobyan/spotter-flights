import { Box } from "@mui/material";
import AutoCompeteAirport from "../autocompleteAirportSearch";
import CustomDatePicker from "../datePicker";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { TRIP_TYPE } from "../../../dataInterface/stateInterface/enums";

export function CustomFlightSearch() {
  const { stateTripType, isLoading, departureDate } = useSelector(
    (state: RootState) => ({
      stateTripType: state.airportSearch.tripType,
      isLoading: state.airportSearch.remoteFlightsData.isLoading,
      departureDate: state.airportSearch.flightParams.date,
    })
  );

  return (
    <Box className="search-container">
      <Box className="flex-row">
        <Box className="input-wrapper">
          <AutoCompeteAirport label="from" isDisabled={isLoading} />
        </Box>
        <Box className="input-wrapper">
          <AutoCompeteAirport label="to" isDisabled={isLoading} />
        </Box>
      </Box>
      <Box className="flex-row">
        <Box className="input-wrapper">
          <CustomDatePicker
            label="Departure"
            disablePast={true}
            isDisabled={isLoading}
          />
        </Box>
        {stateTripType === TRIP_TYPE.Round_Trip ? (
          <Box className="input-wrapper">
            <CustomDatePicker
              label="Return"
              disablePast={true}
              isDisabled={isLoading}
              minDate={departureDate}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
