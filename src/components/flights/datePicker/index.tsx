import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";
import {
  assignDataToLegs,
  assignSearchParams,
  resetRemoteFlightData,
} from "../../../state/flightSearch/airportSearchSlice";

interface IDatePicekr {
  label: string;
  disablePast: boolean;
  isDisabled?: boolean;
  ismindate?: boolean;
  minDate?: string;
  id: number;
  maxDate?: string;
}

export default function CustomDatePicker(props: IDatePicekr) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const datePickerHandler = React.useCallback(
    (newDate: Dayjs | null) => {
      dispatch(resetRemoteFlightData());
      if (!newDate?.isValid()) {
        setValue(null);
        if (props.label === "Departure") {
          dispatch(assignDataToLegs({ id: props.id, data: { date: "" } }));
          return;
        }
        dispatch(assignSearchParams({ returnDate: "" }));
        return;
      }

      setValue(newDate);
      const formatedDate = dayjs(newDate).format("YYYY-MM-DD");
      if (props.label === "Departure") {
        dispatch(
          assignDataToLegs({ id: props.id, data: { date: formatedDate } })
        );
        return;
      }
      dispatch(assignSearchParams({ returnDate: formatedDate }));
    },
    [props.label, props.id]
  );

  const isMindate = React.useMemo(() => {
    if (props.minDate) {
      const d = new Date(props.minDate).setHours(0, 0, 0, 0);
      return d;
    }
    return null;
  }, [props.minDate]);

  const isMaxDate = React.useMemo(() => {
    if (props.maxDate) {
      const d = new Date(props.maxDate).setHours(0, 0, 0, 0);
      return d;
    }
    return null;
  }, [props.maxDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ width: "inherit" }}
          value={value}
          onChange={datePickerHandler}
          disablePast={props.disablePast}
          minDate={dayjs(isMindate)}
          maxDate={dayjs(isMaxDate)}
          format="YYYY-MM-DD"
          label={props.label}
          disabled={props.isDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
