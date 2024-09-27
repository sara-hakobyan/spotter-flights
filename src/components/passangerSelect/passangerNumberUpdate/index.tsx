import { useCallback, useMemo } from "react";
import {
  PASSANGER_CATEGORY,
  PASSANGER_TYPE,
} from "../../../dataInterface/stateInterface/enums";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  passangerDecrement,
  passangerIncrement,
} from "../../../state/flightSearch/airportSearchSlice";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IPassangerUpdate {
  passangerType: PASSANGER_TYPE;
}

enum ACTION_TYPE {
  Increase = "increase",
  Decrease = "decrease",
}

export function PassangerUpdate(props: IPassangerUpdate) {
  const dispatch = useDispatch<AppDispatch>();

  const stateData = useSelector((state: RootState) => state.airportSearch);

  const ageRestriction = useMemo(() => {
    let age = "";
    if (props.passangerType === PASSANGER_TYPE.Adults) {
      age = "(12+)";
    } else if (props.passangerType === PASSANGER_TYPE.Childrens) {
      age = "(2-11)";
    } else {
      age = "(-2)";
    }
    return age;
  }, [props.passangerType]);

  const countHandler = useCallback((actionType: string) => {
    if (actionType === ACTION_TYPE.Decrease) {
      dispatch(
        passangerDecrement({ key: PASSANGER_CATEGORY[props.passangerType] })
      );
      return;
    }
    dispatch(
      passangerIncrement({ key: PASSANGER_CATEGORY[props.passangerType] })
    );
  }, [props.passangerType]);

  const isDisabled = useMemo(() => {
    if (
      props.passangerType === PASSANGER_TYPE.Adults &&
      stateData.passangers[PASSANGER_CATEGORY[props.passangerType]] === 1
    ) {
      return true;
    }
    if (stateData.passangers[PASSANGER_CATEGORY[props.passangerType]] === 0) {
      return true;
    }
  }, [stateData.passangers, props.passangerType]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"flex-start"}
      padding={"7px"}
      justifyContent={"space-between"}
    >
      <Box>
        <Typography>{props.passangerType} </Typography>
        <Typography fontSize={"12px"}>{ageRestriction}</Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          onClick={() => countHandler(ACTION_TYPE.Decrease)}
          disabled={isDisabled}
        >
          <RemoveIcon />
        </IconButton>
        <Typography>
          {stateData.passangers[PASSANGER_CATEGORY[props.passangerType]]}
        </Typography>
        <IconButton
          onClick={() => countHandler(ACTION_TYPE.Increase)}
          disabled={
            stateData.passangers[PASSANGER_CATEGORY[props.passangerType]] > 9
          }
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
