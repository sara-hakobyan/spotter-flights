import { useDispatch, useSelector } from "react-redux";
import CustomMenu from "../genericMenu";
import { AppDispatch, RootState } from "../../../state/store";
import { setTripType } from "../../../state/flightSearch/airportSearchSlice";
import { useCallback } from "react";
import { TRIP_TYPE } from "../../../dataInterface/stateInterface/enums";

export function TripTypeMenu() {
  const { triptTypeState, isLoading } = useSelector((state: RootState) => ({
    triptTypeState: state.airportSearch.tripType,
    isLoading: state.airportSearch.remoteFlightsData.isLoading,
  }));
  const dispatch = useDispatch<AppDispatch>();

  const handler = useCallback((val: string) => {
    dispatch(setTripType(val));
  }, []);

  return (
    <CustomMenu
      isDisabled={isLoading}
      menueItems={TRIP_TYPE}
      itemHandler={handler}
      value={triptTypeState}
    />
  );
}
