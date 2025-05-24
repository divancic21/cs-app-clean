import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ChakraProvider } from '@chakra-ui/react'; // ukloni ako si imao Chakra UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

// kreiraj osnovnu temu (možeš kasnije prilagoditi)
const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* resetira osnovne stilove */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
