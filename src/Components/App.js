import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import {  HashRouter as Router } from 'react-router-dom';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Footer from './Footer';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.css';

const QUERY = gql`
  {
    isLoggedIn @client
  }`
;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

const App = () => {
  const { data: { isLoggedIn }} = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
          {isLoggedIn && <Header />}
          <Wrapper>
            <Routes isLoggedIn={isLoggedIn}/>
            <Footer />
          </Wrapper>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT}></ToastContainer>
        </>
      </Router>
      </>
    </ThemeProvider>);
}

export default App;