import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo-hooks';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import client from '../Apollo/Client';
import AppRouter from './Router';

const App = () => (
  <ThemeProvider theme={Theme}>
    <ApolloProvider client={client}>
      <>
      <GlobalStyles />
      <AppRouter isLoggedIn={false}/>
      </>
    </ApolloProvider>
  </ThemeProvider>);

export default App;
