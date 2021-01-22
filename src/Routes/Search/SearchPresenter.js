/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import FatText from '../../Components/FatText';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  margin-top: 130px;
`;

const Search = ({ searchTerm, loading, data }) => {
  return (
    <Wrapper>
      {!searchTerm && <FatText text='Search for something' />}
      {searchTerm}
    </Wrapper>);
}

export default withRouter(Search);