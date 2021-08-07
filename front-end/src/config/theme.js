import { createTheme } from '@material-ui/core';

const theme = createTheme({
  overrides: {
    MuiButton: {
      text: { fontWeight: 'bold' },
    },
    MuiTab: {
      root: {
        backgroundColor: '#434343',
      },
    },
  },
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#e5e5e5', barBackground: '#434343' },
    primary: {
      light: '#7986cb',
      main: '#007dff',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#ff505f',
      dark: '#c51162',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#F44336',
      dark: '#611A15',
      contrastText: '#611A15',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export default theme;
