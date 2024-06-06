import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppBar';
import getLPTheme from './components/getLPTheme';
import ToggleCustomTheme from './components/toggleCustomTheme';
import { Box } from "@mui/material";

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
          <CssBaseline />
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
          <div>
            <Outlet />
          </div>
          <ToggleCustomTheme
            showCustomTheme={showCustomTheme}
            toggleCustomTheme={toggleCustomTheme}
          />
        </ThemeProvider>
      </div>
    </ApolloProvider>
  );
}


