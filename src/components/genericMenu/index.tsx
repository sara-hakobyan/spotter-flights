import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";

interface ICustomMenu {
  menueItems: any;
  itemHandler: (value: string) => void;
}

export default function CustomMenu(props: ICustomMenu) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cabinClass, setCabinClass] = useState(
    (Object.values(props.menueItems)[0] as string)?.toUpperCase()
  );

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
    const value = e.currentTarget.textContent as string;
    setCabinClass(value);
    handleClose();
  }, []);

  return (
    <Box>
      <Button onClick={handleBtnClick}>{cabinClass}</Button>
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
