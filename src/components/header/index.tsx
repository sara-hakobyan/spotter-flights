import { Box, Typography } from "@mui/material";
import flightsImg from "../../assets/images/flights_nc_4.svg";

export function Header() {
  return (
    <Box width={"100%"} paddingBottom={"15px"}>
      <Box
        // display="flex"
        // justifyContent="center"
        // alignItems="center"
        // height="100vh"
        position={"relative"}
        maxWidth={"1245px"}
        margin={"0 auto"}
      >
        <img
          src={flightsImg}
          alt="Flights Illustration"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
      <Box position={"absolute"} sx={{ top: "200px", left: "45%" }}>
        <Typography variant="h2">Flights</Typography>
      </Box>
    </Box>
  );
}
