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
  const [isDisabled, setIsDisabled] = useState({
    Adults: { increase: false, decrease: false },
    Children: { increase: false, decrease: false },
    Infants: { increase: false, decrease: false },
  });

  useEffect(() => {
    setErrMsg("");
    const adults = stateData.passangers.adults;
    const children = stateData.passangers.childrens;
    const infants = stateData.passangers.infants;
    const allKids = children + infants;
    if (adults + children + infants === 9) {
      setErrMsg("The maximum number of passengers is 9.");
      return;
    }
    if (children > 0 || infants > 0) {
      if (allKids === adults * 2) {
        setErrMsg("Maximum of 2 children per adult.");
        setIsDisabled((prev) => ({
          ...prev,
          Adults: { ...prev.Adults, decrease: true },
          Infants: { ...prev.Infants, increase: true },
          Children: { ...prev.Children, increase: true },
        }));
        return;
      }
      if (infants === adults) {
        setErrMsg("1 baby per adult.");
        setIsDisabled((prev) => ({
          ...prev,
          Adults: { ...prev.Adults, decrease: true },
          Infants: { ...prev.Infants, increase: true },
        }));
        return;
      }
      setIsDisabled((prev) => ({
        ...prev,
        Infants: { ...prev.Infants, increase: false },
        Children: { ...prev.Children, increase: false },
      }));
      if ((adults * 2) % allKids === 1) {
        setIsDisabled((prev) => ({
          ...prev,
          Adults: { ...prev.Adults, decrease: true },
        }));
        return;
      }
      setIsDisabled((prev) => ({
        ...prev,
        Adults: { ...prev.Adults, decrease: false },
      }));
      return;
    }
    setIsDisabled((prev) => ({
      ...prev,
      Adults: { ...prev.Adults, decrease: false },
      Infants: { ...prev.Infants, increase: false },
      Children: { ...prev.Children, increase: false },
    }));
  }, [stateData.totalPassangerCount, stateData.passangers]);
  console.log(isDisabled);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    let count = 0;
    Object.values(stateData.passangers).map((p) => {
      count += p;
    });
    dispatch(setTotalPassangerCount(count));
  }, [stateData.passangers]);

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
        disabled={stateData.remoteFlightsData.isLoading}
      >
        {" "}
        {stateData.totalPassangerCount}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        sx={{ "& .MuiMenu-paper": { width: "200px", padding: "10px" } }}
      >
        {Object.values(PASSANGER_TYPE).map((item, index) => (
          <PassangerUpdate
            passangerType={item}
            key={index}
            isDecrease={isDisabled[item].decrease}
            isIncrease={isDisabled[item].increase}
          />
        ))}

        <Box display={"flex"} justifyContent={"center"}>
          <Button onClick={handleClose}>Done</Button>
        </Box>
        {errmsg && <Typography fontSize={"12px"}>{errmsg}</Typography>}
      </Menu>
    </Box>
  );
}
