export enum CABIN_CLASS {
  Economy = "Economy",
  Premium_Economy = "Premium Economy",
  Business = "Business",
  First = "First",
}

export enum SORT_BY {
  Best = "best",
  Cheapest = "price_high",
  Fastest = "fastest",
  Outbound_Take_Off_Time = "outbound_take_off_time",
  Outbound_Landing_Time = "outbound_landing_time",
  Return_Take_Off_Time = "return_take_off_time",
  Return_Landing_Time = "return_landing_time",
}

export enum PASSANGER_TYPE {
  Adults = "Adults",
  Childrens = "Children",
  Infants = "Infants",
}

export enum TRIP_TYPE {
  One_Way = "One way",
  Round_Trip = "Round trip",
  Multy_City = "Multy-city",
}

export enum FLIGHT_SEARCH_PARAMS {
  Origin = "originSkyId",
  Destination = "destinationSkyId",
  OriginEntity = "originEntityId",
  DestinationEntity = "destinationEntityId",
  Date = "date",
  ReturnDate = "returnDate",
  CabinClass = "cabinClass",
  Adults = "adults",
  Childrens = "childrens",
  Infants = "infants",
  Limit = "limit",
  SortBy = "sortBy",
}


export enum PASSANGER_CATEGORY {
  Adults = "adults",
  Children = "childrens",
  Infants = "infants",
}