import './App.css';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import theme from './config/theme';
import Routes from './routes/Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
