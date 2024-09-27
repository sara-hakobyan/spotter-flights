import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { assignSearchParams } from "../../../state/flightSearch/airportSearchSlice";

interface IDatePicekr {
  label: string;
  disablePast: boolean;
  isDisabled: boolean;
}

export default function CustomDatePicker(props: IDatePicekr) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const datePickerHandler = React.useCallback((newDate: Dayjs | null) => {
    if (!newDate?.isValid()) {
      setValue(null);
      dispatch(assignSearchParams({ date: "" }));
      return;
    }
    setValue(newDate);
    const formatedDate = dayjs(newDate).format("YYYY-MM-DD");
    dispatch(assignSearchParams({ date: formatedDate }));
  }, []);

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
          disabled={props.isDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
