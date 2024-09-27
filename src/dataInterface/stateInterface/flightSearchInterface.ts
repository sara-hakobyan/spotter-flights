export type FlightSearchT = {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: string;
  adults?: number;
  childrens?: number;
  infants?: string;
  sortBy?: string;
  limit?: number;
  currency?: string;
  carriersIds?: string;
  market?: string;
  countryCode?: string;
};
