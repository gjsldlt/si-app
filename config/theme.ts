import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#86BC25',
    },
    secondary: {
      main: '#1C1C1E',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
