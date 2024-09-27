import { Box, Button, Card } from "@mui/material";
import PassangerSelect from "../passangerSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { flightSearchAsync } from "../../state/flightSearch/airportSearchSlice";
import FlightService from "../../services/FlightService";
import { TripTypeMenu } from "../menus/triptypeMenu";
import "./index.css";
import { CustomFlightSearch } from "./customFlghtSearch";
import CabinClassMenu from "../menus/cabinClassMenu";
import { useCallback } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { TRIP_TYPE } from "../../dataInterface/stateInterface/enums";

const service = new FlightService();

export default function FlightSearch() {
  const data = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();

  const serachBtnHandler = useCallback(async () => {
    dispatch(flightSearchAsync());
  }, []);

  return (
    <>
      <Card className="card-container">
        <Box className="flex-container menu-container">
          <Box className="trip-menu">
            <TripTypeMenu />
          </Box>
          <Box className="passanger-menu">
            <PassangerSelect />
          </Box>
          <Box className="cabin-menu">
            <CabinClassMenu />
          </Box>
        </Box>
        <Box>
          <CustomFlightSearch />
          <Box display={"flex"}>
            {data.tripType === TRIP_TYPE.Multy_City ? (
              <Button variant="contained">add fligh</Button>
            ) : null}
          </Box>
        </Box>

        <LoadingButton
          loading={data.remoteFlightsData.isLoading}
          variant="contained"
          onClick={serachBtnHandler}
        >
          Search
        </LoadingButton>
      </Card>
    </>
  );
}
