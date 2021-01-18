/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, HeartEmpty, User, Logo } from './Icons';
import { useQuery } from 'react-apollo-hooks';

const HeaderComponent = styled.header`
  width: 100%;
  border: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInputContainer = styled.div`
  input {
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    height: auto;
    font-size: 14px;
    border-radius: 3px;
    text-align: center;
    width: 70%;
    &::placeholder {
      opacity: 0.8;
      font-weight: 200;
    }
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const ME = gql`
  {
    me {
      userName
    }
  }
`;

const Header = ({ history }) => {
  const search = useInput('');
  const { data } = useQuery(ME);
  console.log(data)
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`)
  };

  return(
    <HeaderComponent>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to='/'><Logo /></Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInputContainer>
              <Input {...search} placeholder="Search" />
            </SearchInputContainer>
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore"><Compass /></HeaderLink>
          <HeaderLink to="/notifications"><HeartEmpty /></HeaderLink>
          {!(data || {}).me ? (
            <HeaderLink to="/#"><User /></HeaderLink>
          ) : (
            <HeaderLink to={`/${data.me.userName}`}><User /></HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </HeaderComponent>
  );
} 
export default withRouter(Header);