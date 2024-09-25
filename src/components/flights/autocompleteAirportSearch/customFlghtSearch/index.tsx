import { Box } from "@mui/material";
import AutoCompeteAirport from "..";
import CustomDatePicker from "../../datePicker";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { TRIP_TYPE } from "../../../../dataInterface/stateInterface/flightSearchInterface";

interface ICustomFlightSearch {
  triptType: string;
}

export function CustomFlightSearch(props: ICustomFlightSearch) {
  const stateTripType = useSelector(
    (state: RootState) => state.airportSearch.tripType
  );

  return (
    <Box className="search-container">
      <Box className="flex-row">
        <Box className="input-wrapper">
          <AutoCompeteAirport label="from" />
        </Box>
        <Box className="input-wrapper">
          <AutoCompeteAirport label="to" />
        </Box>
      </Box>
      <Box className="flex-row">
        <Box className="input-wrapper">
          <CustomDatePicker label="Departure*" disablePast={true} />
        </Box>
        {stateTripType === TRIP_TYPE.Round_Trip ? (
          <Box className="input-wrapper">
            <CustomDatePicker label="Return" disablePast={false} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
