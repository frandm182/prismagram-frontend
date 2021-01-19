/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

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

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  console.log(data, loading);
  return 'feed';
}

