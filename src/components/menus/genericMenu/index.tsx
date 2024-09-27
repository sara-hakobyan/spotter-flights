import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";

interface ICustomMenu {
  menueItems: any;
  itemHandler: (value: string) => void;
  value: string;
  isDisabled: boolean;
}

export default function CustomMenu(props: ICustomMenu) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleBtnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    },
    []
  );

  const handleChange = useCallback((e: React.FormEvent<HTMLElement>) => {
    const value = e.currentTarget.innerText as string;
    handleClose();
    props.itemHandler(value);
  }, []);

  return (
    <Box>
      <Button onClick={handleBtnClick} disabled={props.isDisabled}>
        {props.value}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.values(props.menueItems).map((item, index) => (
          <MenuItem key={index} onClick={handleChange}>
            {item as string}{" "}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
