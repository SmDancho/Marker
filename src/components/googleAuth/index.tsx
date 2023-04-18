import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../../redux/auth';

import { useAppDispatch } from '../../redux/store';

export const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          dispatch(googleAuth(credentialResponse));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};
