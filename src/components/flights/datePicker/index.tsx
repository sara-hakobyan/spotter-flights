import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { assignSearchParams } from "../../../state/airportSearch/airportSearchSlice";

interface IDatePicekr {
  label: string;
  disablePast: boolean;
}

export default function CustomDatePicker(props: IDatePicekr) {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const data = useSelector(
    (state: RootState) => state.airportSearch.flightParams
  );
  const dispatch = useDispatch<AppDispatch>();

  const datePickerHandler = (newDate: Dayjs | null) => {
    if (!newDate?.isValid()) {
      setValue(null);
      dispatch(assignSearchParams({ date: "" }));
      return;
    }
    setValue(newDate);
    const formatedDate = dayjs(newDate).format("YYYY-MM-DD");
    dispatch(assignSearchParams({ date: formatedDate }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ width: "inherit" }}
          value={value}
          onChange={datePickerHandler}
          disablePast={props.disablePast}
          format="YYYY-MM-DD"
          label={props.label}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
