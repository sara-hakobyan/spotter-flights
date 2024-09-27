export default class FlightService {
  baseURL: string;
  rapidApiHost: string;
  rapidApiKey: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_BASE_URL || "";
    this.rapidApiHost = process.env.REACT_APP_RAPIDAPI_HOST || "";
    this.rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY || "";
  }

  async _fetch(url: string, method: string, params?: any, body?: any) {
    let paramsData;
    if (!params) {
      paramsData = "";
    } else {
      paramsData = new URLSearchParams(params).toString();
    }
    const response = await fetch(`${url}?${paramsData}`, {
      method,
      headers: {
        "x-rapidapi-host": this.rapidApiHost,
        "x-rapidapi-key": this.rapidApiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  async searchAirport(value: string) {
    const params = `?query=${value}`;
    const path = `${this.baseURL}/searchAirport`;
    const data = await this._fetch(path, "GET", params);
    return data;
  }

  async searchFlight(params: any) {
    const path = `${this.baseURL}/searchFlights`;
    const data = await this._fetch(path, "GET", params);
    return data;
  }
}
