import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import FatText from './FatText';
import Button from './Button';


const Card = styled.div`
  ${props => props.theme.whiteBox};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ userName, itsFollowing, itsMe, url }) => (
  <Card>
    <EAvatar url={url} size='md' />
    <ELink to={`/${userName}`}><FatText text={userName} /></ELink>
    { !itsMe && <Button text={itsFollowing ? 'Unfollow' : 'Follow'} /> }
  </Card>
)

UserCard.propTypes = {
  userName: PropTypes.string.isRequired,
  itsFollowing: PropTypes.bool.isRequired,
  itsMe: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
}

export default UserCard;