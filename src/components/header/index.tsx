import { Box, Typography } from "@mui/material";
import flightsImg from "../../assets/images/flights_nc_4.svg";
import "./index.css";

export function Header() {
  return (
    <Box className="header-container">
      <Box>
        <img
          src={flightsImg}
          alt="Flights Illustration"
          className="header-img"
        />
      </Box>
      <Box className="header-title">
        <Typography variant="h2">Flights</Typography>
      </Box>
    </Box>
  );
}
