/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import AuthPresenter from './AuthPresenter';
import { LOG_IN } from './AuthQueries';

export default () => {
  
  const [ action, setAction ] = useState('logIn');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const [requestSecret] = useMutation(LOG_IN, { variables: { email: email.value } });

  const onLogin = e => {
    e.preventDefault();
    debugger;
    if (!!email.value) {
      requestSecret();
    }
  }
  return (
    <AuthPresenter 
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onLogin={onLogin}
    />
  );
}