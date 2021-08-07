import './App.css';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import theme from './config/theme';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
