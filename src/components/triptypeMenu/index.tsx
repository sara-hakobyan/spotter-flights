import { TRIP_TYPE } from "../../dataInterface/stateInterface/flightSearchInterface";
import CustomMenu from "../genericMenu";

export function TripTypeMenu() {
  const handler = (val: string) => {};
  return <CustomMenu menueItems={TRIP_TYPE} itemHandler={handler} />;
}
