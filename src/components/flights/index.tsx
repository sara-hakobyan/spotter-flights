import { Box, Card, Input, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import FlightService from "../../services/FlightService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { airportSearchAsync } from "../../state/airportSearch/airportSearchSlice";

const service = new FlightService();

export default function FlightSearch() {
  return (
    <>
      <Card
        sx={{
          boxShadow:
            "1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15);",
          width: "950px",
          height: "200px",
        }}
      >
        <Box>
          <AutoCompeteAirport />
        </Box>
      </Card>
    </>
  );
}

function AutoCompeteAirport() {
  const data = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();
  console.log(JSON.stringify(data, null, 2));

  const onInputChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.currentTarget;
    const val = target.value;

    dispatch(airportSearchAsync(val));
    // await service.searchAirport(val);
  };

  return (
    <Box>
      {/* <Input sx={{ border: "1px solid gray", borderRadius: "5px" }} /> */}
      <TextField
        variant="outlined"
        placeholder="Where from"
        onChange={onInputChange}
      />
    </Box>
  );
}
