import { useDispatch, useSelector } from "react-redux";
import { TRIP_TYPE } from "../../../dataInterface/stateInterface/flightSearchInterface";
import CustomMenu from "../genericMenu";
import { AppDispatch, RootState } from "../../../state/store";
import { setTripType } from "../../../state/flightSearch/airportSearchSlice";
import { useCallback } from "react";

export function TripTypeMenu() {
  const triptTypeState = useSelector(
    (state: RootState) => state.airportSearch.tripType
  );
  const dispatch = useDispatch<AppDispatch>();

  const handler = useCallback((val: string) => {
    console.log(val);
    dispatch(setTripType(val));
  }, []);

  return (
    <CustomMenu
      menueItems={TRIP_TYPE}
      itemHandler={handler}
      value={triptTypeState}
    />
  );
}
