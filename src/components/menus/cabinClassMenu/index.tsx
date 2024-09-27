import { useDispatch, useSelector } from "react-redux";

import { useCallback, useState } from "react";

import { AppDispatch, RootState } from "../../../state/store";
import { assignSearchParams } from "../../../state/flightSearch/airportSearchSlice";
import CustomMenu from "../genericMenu";
import {
  CABIN_CLASS,
  FLIGHT_SEARCH_PARAMS,
} from "../../../dataInterface/stateInterface/enums";

export default function CabinClassMenu() {
  const isLoading = useSelector(
    (state: RootState) => state.airportSearch.remoteFlightsData.isLoading
  );
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("Economy");

  const handler = useCallback((val: string) => {
    const newValue = val.replace(/ /g, "_").toLowerCase();
    dispatch(
      assignSearchParams({ [FLIGHT_SEARCH_PARAMS.CabinClass]: newValue })
    );
    setValue(val);
  }, []);

  return (
    <CustomMenu
      menueItems={CABIN_CLASS}
      itemHandler={handler}
      value={value}
      isDisabled={isLoading}
    />
  );
}
