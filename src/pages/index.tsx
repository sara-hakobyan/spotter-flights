import { Box } from "@mui/material";
import FlightSearch from "../components/flights";
import { Header } from "../components/header";

export default function MainPage() {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Header />
      <FlightSearch />
    </Box>
  );
}
