import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  airportSearchAsync,
  resetAirportSearch,
} from "../../../state/flightSearch/airportSearchSlice";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { FLIGHT_SEARCH_PARAMS } from "../../../dataInterface/stateInterface/enums";

export type OptionT = {
  locationType: string;
  skyId: string;
  entityId: string;
  country: string;
  city: string;
  suggestedLocal: string;
  airpot: string;
};
interface IAutocomplete {
  label: string;
  isDisabled: boolean;
  id: number;
  assignValue: (label: string, data: any, id: number) => void;
}

export default function AutoCompeteAirport(props: IAutocomplete) {
  const data = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const debouncedId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    const fetching = async () => {
      await dispatch(
        airportSearchAsync({ value: inputValue, key: props.label })
      );
    };
    fetching();
  }, [inputValue, props.label]);

  const onInputChange = useCallback(
    async (e: React.SyntheticEvent, value: string) => {
      if (debouncedId.current) {
        clearTimeout(debouncedId.current);
      }
      if (value && value !== inputValue) {
        const newDebouncedId = setTimeout(() => {
          setInputValue(value);
        }, 500);
        debouncedId.current = newDebouncedId;
      }
    },
    [debouncedId, inputValue]
  );

  const optionsData = useMemo(() => {
    if (data.remoteAirportSearch[props.label].data) {
      const arr = data.remoteAirportSearch[props.label].data?.data.map((d) => {
        const obj = {
          locationType: d.navigation.relevantHotelParams.entityType,
          skyId: d.skyId,
          entityId: d.entityId,
          country: d.presentation.subtitle,
          city: d.presentation.title,
          suggestedLocal: d.presentation.suggestionTitle,
          airpot: `${d.navigation.relevantFlightParams.localizedName} ${d.navigation.relevantFlightParams.flightPlaceType}`,
        };
        return obj;
      });
      return arr;
    }
    return [];
  }, [data.remoteAirportSearch[props.label].data]);

  const onOptionSelect = useCallback(
    (
      e: React.SyntheticEvent,
      value: OptionT | null,
      reason: AutocompleteChangeReason
    ) => {
      if (reason === "clear") {
        props.assignValue(props.label, "", props.id);
        return;
      }
      if (reason === "selectOption") {
        setInputValue(value?.airpot as string);
        props.assignValue(props.label, value, props.id);
      }
      dispatch(resetAirportSearch({ key: props.label }));
    },
    [props.label]
  );

  return (
    <Autocomplete
      disabled={props.isDisabled}
      filterOptions={(x) => x}
      sx={{ width: "inherit" }}
      options={optionsData || []}
      loading={data.remoteAirportSearch[props.label].isLoading}
      getOptionLabel={(option) => option.suggestedLocal}
      onInputChange={onInputChange}
      onChange={onOptionSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`Where ${props.label}?`}
          slotProps={{
            input: {
              ...params.InputProps,
            },
          }}
        />
      )}
    />
  );
}
