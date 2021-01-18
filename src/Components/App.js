import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import Footer from './Footer';

import 'react-toastify/dist/ReactToastify.css';

const QUERY = gql`
  {
    isLoggedIn @client
  }`
;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

const App = () => {
  const { data: { isLoggedIn }} = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <AppRouter isLoggedIn={isLoggedIn}/>
        <Footer />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}></ToastContainer>
      </Wrapper>
    </ThemeProvider>);
}

export default App;