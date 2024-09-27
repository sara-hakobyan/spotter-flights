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
  isDisabled?: boolean;
  ismindate?: boolean;
  minDate?: string;
}

export default function CustomDatePicker(props: IDatePicekr) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const datePickerHandler = React.useCallback(
    (newDate: Dayjs | null) => {
      if (!newDate?.isValid()) {
        setValue(null);
        if (props.label === "Departure") {
          dispatch(assignSearchParams({ date: "" }));
          return;
        }
        dispatch(assignSearchParams({ returnDate: "" }));
        return;
      }

      setValue(newDate);
      const formatedDate = dayjs(newDate).format("YYYY-MM-DD");
      if (props.label === "Departure") {
        dispatch(assignSearchParams({ date: formatedDate }));
        return;
      }
      dispatch(assignSearchParams({ returnDate: formatedDate }));
    },
    [props.label]
  );

  const isMindate = React.useMemo(() => {
    if (props.minDate) {
      const d = new Date(props.minDate).setHours(0, 0, 0, 0);
      return d;
    }
    return null;
  }, [props.minDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ width: "inherit" }}
          value={value}
          onChange={datePickerHandler}
          disablePast={props.disablePast}
          minDate={dayjs(isMindate)}
          format="YYYY-MM-DD"
          label={props.label}
          disabled={props.isDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
