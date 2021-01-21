import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { toast } from 'react-toastify';

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
  const [selfComments, setSelfComments] = useState([]);

  const slide = () => setTimeout(() => setCurrentItem(currentItem === files.length - 1 ? 0 : currentItem + 1), 3000);

  const comment = useInput('');

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
  const [addCommentMutation] = useMutation(ADD_COMMENT, { variables: { postId: id, text: comment.value } });
  
  useEffect(() => { slide(); });

  const toggleLike = async () => {
    const actualValue = isLikedS;
    setIsLiked(!isLikedS);
    setLikeCount(actualValue ? likeCountS - 1 : likeCountS + 1)
    await toggleLikeMutation();
  }

  const onKeyPress = async event => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try {
        const { data: { addComment } } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue('');
      } catch {
        toast.error('Can`t sent comment');
      }
     
    }
    return;
  }

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
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
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