import dayjs from "dayjs";
import { FlightDataResponse } from "../../dataInterface/stateInterface/remoteDataInterface/flightsDataInterface";
import { IFlightConverted } from "./convertedRawFlightInterface";

export const flightsRawDataConverter = (
  data: FlightDataResponse
): IFlightConverted[] => {
  const arrOfFlights = data.data.itineraries;

  const flights = arrOfFlights.map((f) => {
    const info = {
      id: f.id,
      price: f.price?.formatted,
      totalcountData: data.data.context.totalResults,
      legs: f.legs.map((l) => {
        const segments = l.segments.map((s) => {
          return {
            arrivalDate: dayjs(s.arrival).format("ddd, D MMM YYYY"),
            departureDate: dayjs(s.departure).format("ddd, D MMM YYYY"),
            departureTime: dayjs(s.departure).format("hh:mm"),
            arrivalTime: dayjs(s.arrival).format("hh:mm"),
            arrivalAirport: `${s.destination.name} ${s.destination.type} (${s.destination.displayCode})`,
            departureAirport: `${s.origin.name} ${s.origin.type} (${s.origin.displayCode})`,
            duration: convertMinutes(s.durationInMinutes),
            carrier: s.operatingCarrier.name,
          };
        });

        const carriers = l.carriers?.marketing?.map((c) => {
          return {
            logo: c.logoUrl,
            name: c.name,
          };
        });

        return {
          arrivalTime: dayjs(l.arrival).format("hh:mm"),
          departureTime: dayjs(l.departure).format("hh:mm"),
          departureDate: dayjs(l.departure).format("ddd, D MMM YYYY"),
          flightID: l.id,
          duration: convertMinutes(Number(l.durationInMinutes)),
          stopCounts: l.stopCount,
          originCode: l.origin.displayCode,
          destinationCode: l.destination.displayCode,
          segments,
          carriers,
        };
      }),
    };

    return info;
  });

  return flights;
};

const convertMinutes = (durationInMinutes: number) => {
  const days = Math.floor(durationInMinutes / 1440);
  const hours = Math.floor((durationInMinutes % 1440) / 60);
  const minutes = durationInMinutes % 60;

  let duration = "";

  if (days) {
    duration += `${days}d `;
  }
  if (hours) {
    duration += `${hours}h `;
  }
  if (minutes) {
    duration += `${minutes}m`;
  }

  return duration;
};
