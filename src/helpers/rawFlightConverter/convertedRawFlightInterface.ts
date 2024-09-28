export interface IFlightConverted {
  id: string;
  price?: string;
  totalcountData: number;
  legs: LegConverted[];
}

export interface LegConverted {
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
  arrivalDate: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  arrivalAirport: string;
  departureAirport: string;
  duration: string;
  carrier: string;
}
