import { useDispatch, useSelector } from "react-redux";

import { useCallback, useState } from "react";
import CustomMenu from "../genericMenu";
import { CABIN_CLASS, FLIGHT_SEARCH_PARAMS } from "../../../dataInterface/stateInterface/flightSearchInterface";
import { AppDispatch } from "../../../state/store";
import { assignSearchParams } from "../../../state/flightSearch/airportSearchSlice";

export default function CabinClassMenu() {
  // const stateCabinClass = useSelector(
  //   (state: RootState) => state.airportSearch.flightParams.cabinClass
  // );
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("Economy");

  const handler = useCallback((val: string) => {
    const newValue = val.replace(/ /g, "_").slice(0, -1).toLowerCase();
    dispatch(
      assignSearchParams({ [FLIGHT_SEARCH_PARAMS.CabinClass]: newValue })
    );
    setValue(val);
  }, []);

  return (
    <CustomMenu menueItems={CABIN_CLASS} itemHandler={handler} value={value} />
  );
}
