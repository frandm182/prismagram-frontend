import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getSize = size => {
  const sizes = {
    'sm': '30px',
    'md': '50px',
    'lg': '150px'
  };

  return `
    width: ${sizes[size || 'sm']};
    height: ${sizes[size || 'sm']}
    `;
}

const Continer = styled.div`
  ${props => getSize(props.size)};
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = 'sm', url, className }) => <Continer size={size} url={url} className={className} />;

Avatar.propTypes = { 
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  url: PropTypes.string.isRequired
}

export default Avatar;