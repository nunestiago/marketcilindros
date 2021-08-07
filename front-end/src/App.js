import './App.css';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import theme from './config/theme';
import { Login } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  );
}

export default App;
