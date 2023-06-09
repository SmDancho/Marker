import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useState } from 'react';
import { RootState } from '../../redux/store';

import { registerUser, loginUser } from '../../redux/auth';

import LoadingButton from '@mui/lab/LoadingButton';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { GoogleAuth } from '../googleAuth';
import { TwitchAuthComponent } from '../twitchAuth';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';
export const Auth = () => {
  const [register, setRegister] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { status, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="m-auto h-[100vh] flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-[550px] gap-4"
      >
        {status && <Alert severity="info">{status}</Alert>}
        <div className="flex items-center flex-col gap-4">
          <GoogleAuth />
          <TwitchAuthComponent />
        </div>
        <TextField
          id="username"
          label={translate.t('username')}
          variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="password"
          label={translate.t('password')}
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          variant="outlined"
          loading={isLoading}
          onClick={() => {
            register
              ? dispatch(
                  registerUser({
                    username,
                    password,
                  })
                )
              : dispatch(
                  loginUser({
                    username,
                    password,
                  })
                );
          }}
        >
          {register ? translate.t('register') : translate.t('login')}
        </LoadingButton>
        <span
          className="cursor-pointer"
          onClick={() => setRegister((prev) => !prev)}
        >
          {translate.t("or")} {register ? translate.t('login') : translate.t('register')}
        </span>
      </form>
    </div>
  );
};
