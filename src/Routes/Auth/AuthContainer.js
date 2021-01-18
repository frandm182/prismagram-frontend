/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import AuthPresenter from './AuthPresenter';
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from './AuthQueries';

export default () => {
  
  const [ action, setAction ] = useState('logIn');
  const userName = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const secret = useInput('');
  const email = useInput('franjdm@gmail.com');
  const [requestSecretMutation] = useMutation(LOG_IN, { variables: { email: email.value } });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: { 
      userName: userName.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, { 
    variables: { secret: secret.value, email: email.value } 
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === 'logIn') {
      if (!!email.value) {
        try {
          const { data: { requestSecret } } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error('You dont have an account yet, create one');
            setAction('signUp');
          } else {
            toast.success('Check your inbox');
            setAction('confirm');
          }
        } catch {
          toast.error('Can´t request secret');
        }
        
      } else {
        toast.error('Email is required');
      }
    } else if (action === 'signUp') {
      if (!!userName.value && !!email.value && !!firstName.value && !!lastName.value) {
        try {
          const { data: { createAccount } } = await createAccountMutation();
          if (!createAccount) {
            toast.error('You cant create account');
          } else {
            toast.success('You can create account');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (error) {
          toast.error(error.message);
        }
        
      } else {
        toast.error('All fields is required');
      }
    } else if (action === 'confirm') {
      if (!!secret.value) {
        try {
          const { data: { confirmSecret: token } } = await confirmSecretMutation();
          console.log(token);
          if (token) {
            localLogInMutation({ variables: { token }});
          }
        } catch {
          toast.error('Can´t confirm secret');
        }
      } else {
        toast.error('Secret incorrect');
      }
    }
    
  }
  return (
    <AuthPresenter 
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
}