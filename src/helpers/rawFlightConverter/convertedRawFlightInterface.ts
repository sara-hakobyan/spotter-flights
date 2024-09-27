export interface IFlightConverted {
  id: string;
  price?: string;
  totalcountData: number;
  arrivalTime: string;
  departureTime: string;
  departureDate: string;
  flightID: string;
  duration: string;
  stopCounts: number;
  originCode: string;
  destinationCode: string;
  segments: Segment[];
  carriers: { logo: string; name: string }[];
}

export interface Segment {
  arrivialDate: string;
  departureDate: string;
  departureTime: string;
  arrivialTime: string;
  arrivialAirport: string;
  departureAirport: string;
  duration: string;
  carrier: string;
}
