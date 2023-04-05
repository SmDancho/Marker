import { useAppSelector, useAppDispatch } from '../../redux/store';
import { getme } from '../../redux/auth';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { Auth } from '../../components/Auth';
import { ProfileWidget } from '../../widgets/profileWidget';

import type { user } from '../../types';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(getme());
  }, []);

  return <>{token ? <ProfileWidget {...(user as user)} /> : <Auth />}</>;
};
