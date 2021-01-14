/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  border-radius: 0;
  width: 300px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

export default () => {
  const [ action, setAction ] = useState('logIn');
  return (
    <Wrapper>
      <StateChanger>
        {action === 'logIn' ? (
          <>
            Don´t have an account? {' '} 
            <Link onClick={() => setAction('signUp')}>Sign up </Link> 
          </>
        ) : (
          <>
            Have an account? {' '} 
            <Link onClick={() => setAction('signIn')}>Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
}