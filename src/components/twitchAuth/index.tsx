import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { twitchAuth } from '../../redux/auth';

import { useAppDispatch } from '../../redux/store';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';
interface twitchUser {
  client_id: string;
  expires_in: number;
  login: string;
  scopes: string[];
  user_id: string;
}
interface tokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
}

export const TwitchAuthComponent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<tokenData | null>(null);
  const [user, setUser] = useState<twitchUser | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');

  const handleAuth = () => {
    axios
      .post('https://id.twitch.tv/oauth2/token', {
        client_id: import.meta.env.VITE_TWITCH_ID,
        client_secret: import.meta.env.VITE_TWITCH_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri:
          import.meta.env.MODE === 'development'
            ? import.meta.env.VITE_TWITCH_REDIRECT_DEV
            : import.meta.env.VITE_TWITCH_REDIRECT_PROD,
        scopse: 'user:edit',
      })
      .then((response) => setData(response.data));

    if (data) {
      validateToken();
    }
    if (user) {
      dispatch(twitchAuth(user as twitchUser));
    }
  };
  const validateToken = () => {
    axios
      .get('https://id.twitch.tv/oauth2/validate', {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      })
      .then((response) => setUser(response.data));
  };

  useEffect(() => {
    handleAuth();
  }, [data, user]);

  return (
    <>
      <button
        onClick={handleAuth}
        className="bg-[#6441a5] w-[225px] h-[40px] rounded-sm  flex items-center gap-5 justify-center"
      >
        <a
          href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${
            import.meta.env.VITE_TWITCH_ID
          }&redirect_uri=${
            import.meta.env.MODE === 'development'
              ? import.meta.env.VITE_TWITCH_REDIRECT_DEV
              : import.meta.env.VITE_TWITCH_REDIRECT_PROD
          }&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls`}
        >
          {translate.t('ConnectWithTwitch')}
        </a>
        <img width={30} height={30} src="/twitchIcon.png" alt="twitch icon" />
      </button>
    </>
  );
};
