import { Box, Button, IconButton, Menu, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback, useMemo, useState } from "react";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { PASSANGER_TYPE } from "../../dataInterface/stateInterface/enums";

export default function PassangerSelect() {
  const data = useSelector((state: RootState) => state.airportSearch);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [totalPassangers, setTotalPassangers] = useState(1);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleBtnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    },
    []
  );

  return (
    <Box>
      <Button
        onClick={handleBtnClick}
        startIcon={<PersonIcon />}
        endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />}
        disabled={data.remoteFlightsData.isLoading}
      >
        {" "}
        {totalPassangers}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.values(PASSANGER_TYPE).map((item, index) => (
          <CustomMenuItem
            passangerType={item}
            key={index}
            // setTotalPassangers={setTotalPassangers}
          />
        ))}
        <Box>
          <Button>Cancel</Button>
          <Button>Done</Button>
        </Box>
      </Menu>
    </Box>
  );
}

interface ICustomMenuItem {
  passangerType: PASSANGER_TYPE;
  // setTotalPassangers: (val: number) => void;
}

enum ACTION_TYPE {
  Increase = "increase",
  Decrease = "decrease",
}
function CustomMenuItem(props: ICustomMenuItem) {
  const [count, setcount] = useState<number>(
    props.passangerType === PASSANGER_TYPE.Adults ? 1 : 0
  );
  // const [totalCount, setTotalCount] = useState(1);

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
      setcount((prev) => {
        if (prev === 0) {
          return prev;
        }
        return (prev -= 1);
      });
      return;
    }
    setcount((prev) => {
      return (prev += 1);
    });
  }, []);

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
        <IconButton onClick={() => countHandler(ACTION_TYPE.Decrease)}>
          <RemoveIcon />
        </IconButton>
        <Typography>{count}</Typography>
        <IconButton onClick={() => countHandler(ACTION_TYPE.Increase)}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
