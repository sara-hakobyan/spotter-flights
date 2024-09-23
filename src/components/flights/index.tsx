import { Box, Card, Input, TextField } from "@mui/material";
import { ChangeEvent } from "react";

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
  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.currentTarget;
    const val = target.value;

    console.log(val);
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
