/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';

const FEED_QUERY = gql`
{
  seeFeed {
    id
    location
    caption
    user {
      id
      avatar
      userName
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      user {
        id
        userName
      }
    }
    createdAt
  }
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  console.log(data, loading);
  return (
    <Wrapper>{loading ? <Loader /> : 'feed'}</Wrapper>
  );
}

