import { Box, Button, Menu, MenuItem } from "@mui/material";
import { CABIN_CLASS } from "../../dataInterface/stateInterface/flightSearchInterface";
import { useCallback, useState } from "react";
import CustomMenu from "../genericMenu";

export default function CabinClassMenu() {
  const handler = (val: string) => {};
  return <CustomMenu menueItems={CABIN_CLASS} itemHandler={handler} />;
}
