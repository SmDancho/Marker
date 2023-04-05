import { GoogleLogin } from '@react-oauth/google';

import axios from 'axios';

export const GoogleAuth = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);

        axios.post('http://localhost:5000/auth/google', credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
