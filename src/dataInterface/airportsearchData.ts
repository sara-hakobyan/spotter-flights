export interface IAirportSearchData {
  status: boolean;
  timestamp: number;
  data: {
    skyId: string;
    entityId: string;
    presentation: {
      title: string;
      suggestionTitle: string;
      subtitle: string;
    };
    navigation: {
      entityId: string;
      entityType: string;
      localizedName: string;
      relevantFlightParams: {
        skyId: string;
        entityId: string;
        flightPlaceType: string;
        localizedName: string;
      };
      relevantHotelParams: {
        entityId: string;
        entityType: string;
        localizedName: string;
      };
    };
  }[];
}

export default interface IRemoteData<T> {
  isLoading: boolean;
  error: string;
  message?: string;
  data: T
}
