import { Box, Button, Card } from "@mui/material";
import CabinClassMenu from "../cabinClassMenu";
import PassangerSelect from "../passangerSelect";
import AutoCompeteAirport from "./autocompleteAirportSearch";
import CustomDatePicker from "./datePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { flightSearchAsync } from "../../state/airportSearch/airportSearchSlice";
import FlightService from "../../services/FlightService";
import { TripTypeMenu } from "../triptypeMenu";
const service = new FlightService();

export default function FlightSearch() {
  const data = useSelector(
    (state: RootState) => state.airportSearch.flightParams
  );
  const dispatch = useDispatch<AppDispatch>();

  const serachBtnHandler = async () => {
    console.log(data);
    dispatch(flightSearchAsync());
  };

  return (
    <>
      <Card
        sx={{
          boxShadow:
            "1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15);",
          width: "1100px",
          height: "fitContent",
          WebkitBorderRadius: "10px",
          padding: "15px",
        }}
      >
        <Box display={"flex"} padding={"5px"}>
          <Box className="trip-menu" width={"120px"}>
            <TripTypeMenu />
          </Box>
          <Box className="passanger-menu" width={"100px"}>
            <PassangerSelect />
          </Box>
          <Box className="cabin-menu">
            <CabinClassMenu />
          </Box>
        </Box>

        <CustomFlightSearch triptType="round" />

        <Button variant="contained" onClick={serachBtnHandler}>
          search
        </Button>
      </Card>
    </>
  );
}

interface ICustomFlightSearch {
  triptType: string;
}

function CustomFlightSearch(props: ICustomFlightSearch) {
  return (
    <Box
      display={"flex"}
      alignItems={"self-end"}
      flexDirection={"row"}
      sx={{ boxSizing: "border-box" }}
      flexWrap={"wrap"}
    >
      <Box display={"flex"}>
        <Box width={"250px"} p={"10px"}>
          <AutoCompeteAirport label="from" />
        </Box>
        <Box width={"250px"} p={"10px"}>
          <AutoCompeteAirport label="to" />
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box width={"250px"} p={"10px"}>
          <CustomDatePicker label="Departure*" disablePast={true} />
        </Box>
        {props.triptType === "round" ? (
          <Box width={"250px"} p={"10px"}>
            <CustomDatePicker label="Return" disablePast={false} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
