import { Box, Button, Card, IconButton } from "@mui/material";
import PassangerSelect from "../passangerSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  addNewLegToData,
  flightSearchAsync,
  removeLegFromData,
  resetRemoteFlightData,
  searchFlightsMultiStops,
  setTripType,
} from "../../state/flightSearch/airportSearchSlice";
import FlightService from "../../services/FlightService";
import { TripTypeMenu } from "../menus/triptypeMenu";
import "./index.css";
import { CustomFlightSearch } from "./customFlghtSearch";
import CabinClassMenu from "../menus/cabinClassMenu";
import { useCallback, useMemo } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { TRIP_TYPE } from "../../dataInterface/stateInterface/enums";
import CloseIcon from "@mui/icons-material/Close";
import { paramsModifier } from "../../helpers/paramsModifier";

const service = new FlightService();

export default function FlightSearch() {
  const data = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();

  const serachBtnHandler = useCallback(async () => {
    dispatch(resetRemoteFlightData());
    let paramsFlight;
    if (data.tripType === TRIP_TYPE.Multy_City && data.legs.length === 1) {
      dispatch(setTripType(TRIP_TYPE.One_Way));
      paramsFlight = paramsModifier(TRIP_TYPE.One_Way, data.legs);
    } else {
      paramsFlight = paramsModifier(data.tripType as TRIP_TYPE, data.legs);
      if (data.tripType === TRIP_TYPE.Multy_City) {
        await dispatch(searchFlightsMultiStops(paramsFlight));
        return;
      }
      await dispatch(flightSearchAsync(paramsFlight));
    }
  }, [data.tripType, data.legs]);

  const handleAddFlightBtn = useCallback(() => {
    dispatch(addNewLegToData());
  }, []);

  const handleRemoveBtn = (id: number) => {
    dispatch(removeLegFromData(id));
  };

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
        <Box
          display={"flex"}
          flexDirection={"column"}
          className="flight-search-conatainer"
        >
          {data.legs.map((l, index) => (
            <Box
              key={index}
              display={"flex"}
              width={"fit-content"}
              className="icon-container"
            >
              <CustomFlightSearch
                id={l.id}
                isDisabled={index > 0 && !data.legs[index - 1]?.date}
                minDate={
                  index > 0 && data.legs[index - 1]?.date
                    ? data.legs[index - 1]?.date
                    : ""
                }
                maxDate={data.legs[index + 1]?.date}
              />
              {index > 0 && (
                <IconButton onClick={() => handleRemoveBtn(l.id || 0)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}

          <Box display={"flex"} m={"15px"}>
            {data.tripType === TRIP_TYPE.Multy_City && data.legs.length < 4 ? (
              <Button variant="contained" onClick={handleAddFlightBtn}>
                add fligh
              </Button>
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
