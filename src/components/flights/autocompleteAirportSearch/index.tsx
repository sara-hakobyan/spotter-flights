import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { FLIGHT_SEARCH_PARAMS } from "../../../dataInterface/stateInterface/flightSearchInterface";
import {
  airportSearchAsync,
  assignSearchParams,
} from "../../../state/flightSearch/airportSearchSlice";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

interface IAutocomplete {
  label: string;
}

type OptionT = {
  locationType: string;
  skyId: string;
  entityId: string;
  country: string;
  city: string;
  suggestedLocal: string;
  airpot: string;
};

export default function AutoCompeteAirport(props: IAutocomplete) {
  const data = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const debouncedId = useRef<NodeJS.Timeout | null>(null);

  const key = useMemo(() => {
    if (props.label === "from") {
      return {
        origin: FLIGHT_SEARCH_PARAMS.Origin,
        entity: FLIGHT_SEARCH_PARAMS.OriginEntity,
      };
    }
    return {
      origin: FLIGHT_SEARCH_PARAMS.Destination,
      entity: FLIGHT_SEARCH_PARAMS.DestinationEntity,
    };
  }, [props.label]);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    const fetching = async () => {
      await dispatch(
        airportSearchAsync({ value: inputValue, key: key.origin })
      );
    };
    fetching();
  }, [inputValue, key]);

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
    if (data.remoteAirportSearch[key.origin].data) {
      const arr = data.remoteAirportSearch[key.origin].data?.data.map((d) => {
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
  }, [data.remoteAirportSearch[key.origin].data]);

  const onOptionSelect = useCallback(
    (
      e: React.SyntheticEvent,
      value: OptionT | null,
      reason: AutocompleteChangeReason
    ) => {
      if (reason === "clear") {
        dispatch(assignSearchParams({ [key.origin]: "" }));
        dispatch(assignSearchParams({ [key.entity]: "" }));

        return;
      }
      if (reason === "selectOption") {
        setInputValue(value?.airpot as string);
        dispatch(assignSearchParams({ [key.origin]: value?.skyId as string }));
        dispatch(
          assignSearchParams({ [key.entity]: value?.entityId as string })
        );
      }
    },
    [key]
  );

  return (
    <Autocomplete
      filterOptions={(x) => x}
      sx={{ width: "inherit" }}
      options={optionsData || []}
      loading={data.remoteAirportSearch[key.origin].isLoading}
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
