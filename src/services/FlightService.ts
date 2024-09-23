interface IFlightService {
  baseURL: string;
  rapidApiHost: string;
  rapidApiKey: string;
}

export default class FlightService {
  baseURL: string;
  rapidApiHost: string;
  rapidApiKey: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_BASE_URL || "";
    this.rapidApiHost = process.env.REACT_APP_RAPIDAPI_HOST || "";
    this.rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY || "";
  }

  // protected static async _fetch(
  //   url: string,
  //   method: string,
  //   params?: any,
  //   body?: any
  // ) {
  //   let paramsData;
  //   if (!params) {
  //     paramsData = "";
  //   } else {
  //     paramsData = params;
  //   }
  //   const response = await fetch(`${url}flight/${paramsData}`, { method });
  //   console.log(response);
  // }

  async searchAirport(value: string) {
    console.log(process.env.REACT_APP_BASE_URL);
    console.log(`${this.baseURL}/searchAirport/${value}`);
    const res = await fetch(`${this.baseURL}/searchAirport?query=${value}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": this.rapidApiHost,
        "x-rapidapi-key": this.rapidApiKey,
        // Content: "application/json",
      },
    });
    const data = await res.json();
    console.log(data, res);
    return data;
  }
}
