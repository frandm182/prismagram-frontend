import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';

const PostContainer = ({ 
  id, 
  user, 
  files, 
  likeCount, 
  isLiked, 
  comments, 
  createdAt,
  caption,
  location
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
 
  const slide = () => {
    setTimeout(() => setCurrentItem(currentItem === files.length - 1 ? 0 : currentItem + 1), 3000);
  };
  const comment = useInput('');

  useEffect(() => {
    slide();
  }, [currentItem]);

  return (
    <PostPresenter 
      user={user} 
      files={files} 
      likeCount={likeCountS}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      caption={caption}
      location={location}
      currentItem={currentItem}
      slide={slide}
    />
  )
}

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired, 
  files: PropTypes.arrayOf(PropTypes.shape({ 
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired, 
  likeCount: PropTypes.number.isRequired, 
  isLiked: PropTypes.bool.isRequired, 
  comments: PropTypes.arrayOf(PropTypes.shape({ 
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  createdAt: PropTypes.string
}

export default PostContainer;