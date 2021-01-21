/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable array-callback-return */

import React from 'react';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { Helmet } from 'rl-react-helmet';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

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
  margin-top: 130px;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  data?.seeFeed || [].map(post => { console.log(post)});
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      { loading && <Loader /> } 
      { !loading &&
        data?.seeFeed && 
        data.seeFeed.map(post => (
          <Post 
            key={post.id} 
            id={post.id} 
            user={post.user} 
            files={post.files} 
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            caption={post.caption}
            location={post.location}
          />
      ))}
      
    
    </Wrapper>
  );
}

