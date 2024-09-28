import { useDispatch, useSelector } from "react-redux";
import CustomMenu from "../genericMenu";
import { AppDispatch, RootState } from "../../../state/store";
import {
  resetlegsToDefault,
  resetRemoteFlightData,
  setTripType,
} from "../../../state/flightSearch/airportSearchSlice";
import { useCallback } from "react";
import { TRIP_TYPE } from "../../../dataInterface/stateInterface/enums";

export function TripTypeMenu() {
  const state = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();

  const handler = useCallback((val: string) => {
    dispatch(resetRemoteFlightData());
    dispatch(resetlegsToDefault());
    dispatch(setTripType(val));
  }, []);

  return (
    <CustomMenu
      isDisabled={state.remoteFlightsData.isLoading}
      menueItems={TRIP_TYPE}
      itemHandler={handler}
      value={state.tripType}
    />
  );
}
