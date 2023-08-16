import { useContext } from "react";
import { IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { ColorModeContext } from "./color-mode-wrapper";

export default function ColorToggleButton() {
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness5Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}