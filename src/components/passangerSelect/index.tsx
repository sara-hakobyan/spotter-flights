import { Box, Button, Menu, Typography } from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { PASSANGER_TYPE } from "../../dataInterface/stateInterface/enums";
import { setTotalPassangerCount } from "../../state/flightSearch/airportSearchSlice";
import { PassangerUpdate } from "./passangerNumberUpdate";

export default function PassangerSelect() {
  const stateData = useSelector((state: RootState) => state.airportSearch);
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [errmsg, setErrMsg] = useState("");
  // const [isDisabled, setIsDisabled] = useState({
  //   adults: { increase: false, decrease: false },
  //   children: { increase: false, decrease: false },
  //   infants: { increase: false, decrease: false },
  // });

  useEffect(() => {
    setErrMsg("");
    const adults = stateData.passangers.adults;
    const children = stateData.passangers.childrens;
    const infants = stateData.passangers.infants;
    const allKids = children + infants;
    if (adults + children + infants > 9) {
      setErrMsg("The maximum number of passengers is 9.");
      return;
    }

    if (children > 0 || infants > 0) {
      if (allKids > adults * 2) {
        setErrMsg("Maximum of 2 children per adult.");
        return;
      }

      if (infants > adults) {
        setErrMsg("1 baby per adult.");
        return;
      }
    }
  }, [stateData]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleBtnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    },
    []
  );

  const handleTotalSave = useCallback(
    (actiontype: string) => {
      let count = 0;
      Object.values(stateData.passangers).map((p) => {
        count += p;
      });
      dispatch(setTotalPassangerCount(count));
      handleClose();
    },
    [stateData.passangers]
  );

  return (
    <Box>
      <Button
        onClick={handleBtnClick}
        startIcon={<PersonIcon />}
        endIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />}
        disabled={stateData.remoteFlightsData.isLoading}
      >
        {" "}
        {stateData.totalPassangerCount}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiMenu-paper": { width: "200px", padding: "10px" } }}
      >
        {Object.values(PASSANGER_TYPE).map((item, index) => (
          <PassangerUpdate passangerType={item} key={index} />
        ))}
        {errmsg ? (
          <Typography fontSize={"12px"}>{errmsg}</Typography>
        ) : (
          <Box>
            <Button onClick={() => handleTotalSave("cancel")}>Cancel</Button>
            <Button onClick={() => handleTotalSave("done")}>Done</Button>
          </Box>
        )}
      </Menu>
    </Box>
  );
}
