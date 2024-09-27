export interface FlightDataResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: Context;
    itineraries: Itinerary[];
  };
  message?: string;
}

interface Context {
  status: string;
  totalResults: number;
}

interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: FareAttributes;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

interface Leg {
  id: string;
  origin: AirportInfo;
  destination: AirportInfo;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

interface AirportInfo {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

interface Carriers {
  marketing: Carrier[];
  operating: Carrier[];
  operationType: string;
}

interface Carrier {
  id: number;
  logoUrl: string;
  name: string;
}

interface Segment {
  id: string;
  origin: SegmentLocation;
  destination: SegmentLocation;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: CarrierInfo;
  operatingCarrier: CarrierInfo;
}

interface SegmentLocation {
  flightPlaceId: string;
  displayCode: string;
  parent: LocationParent;
  name: string;
  type: string;
  country: string;
}

interface LocationParent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

interface CarrierInfo {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

interface FareAttributes {}
