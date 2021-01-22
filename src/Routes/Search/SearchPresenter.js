/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';

const Wrapper = styled.div`
  height: 50vh;
  margin-top: 130px;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  const users = data?.searchUser;
  const photos = data?.searchPost;

  if (!searchTerm) {
    return (<Wrapper><FatText text='Search for something' /></Wrapper>);
  } else if (loading) {
    return (<Wrapper><Loader /></Wrapper>);
  } else if (data && users && photos) {
    return (<Wrapper>
      <Section>
        {!users.length ? 
          <FatText text='No users found' /> :
          [...users, ...users].map(({ userName, itsFollowing, itsMe, avatar, id }) => (
            <UserCard key={id} userName={userName} itsFollowing={itsFollowing} itsMe={itsMe} url={avatar} />
          ))
        }
      </Section>
      <Section>
        {!photos.length ? 
          <FatText text='No photstos found' /> :
         'photo'
        }
      </Section>
    </Wrapper>);
  }
}

export default withRouter(SearchPresenter);