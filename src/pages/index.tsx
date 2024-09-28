import { Box } from "@mui/material";
import FlightSearch from "../components/flights";
import { Header } from "../components/header";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import FlightDataCard from "../components/flights/flightDataCard";
import { useEffect, useMemo, useState } from "react";
import { flightsRawDataConverter } from "../helpers/rawFlightConverter/flightsRawDataConverter";

export default function MainPage() {
  const stateData = useSelector(
    (state: RootState) => state.airportSearch.remoteFlightsData
  );
  const [visibleCount, setVisibleCount] = useState(10);

  const convertedFlights = useMemo(() => {
    if (stateData.data) {
      return flightsRawDataConverter(stateData.data);
    }
    return null;
  }, [stateData.data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setVisibleCount((prevCount) => prevCount + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Header />
      <FlightSearch />
      {convertedFlights
        ? convertedFlights
            .slice(0, visibleCount)
            .map((d, index) => <FlightDataCard data={d} key={index} />)
        : null}
    </Box>
  );
}
