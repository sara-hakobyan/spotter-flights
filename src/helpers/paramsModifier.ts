import {
  FLIGHT_SEARCH_PARAMS,
  TRIP_TYPE,
} from "../dataInterface/stateInterface/enums";
import { Legs } from "../state/flightSearch/airportSearchSlice";

export const paramsModifier = (triptype: TRIP_TYPE, data: Legs[]) => {
  if (triptype !== TRIP_TYPE.Multy_City) {
    return {
      [FLIGHT_SEARCH_PARAMS.Origin]: data[0].origin,
      [FLIGHT_SEARCH_PARAMS.OriginEntity]: data[0].originEntityId,
      [FLIGHT_SEARCH_PARAMS.Destination]: data[0].destination,
      [FLIGHT_SEARCH_PARAMS.DestinationEntity]: data[0].destinationEntityId,
      [FLIGHT_SEARCH_PARAMS.Date]: data[0].date,
    };
  }
  const updated = data.map(({ id, ...rest }) => {
    return { ...rest };
  });
  return updated;
};
