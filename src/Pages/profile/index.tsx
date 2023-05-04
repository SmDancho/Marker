import { useEffect, useState, memo } from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/store';
import { getme } from '../../redux/auth';

import { Auth } from '../../components/Auth';
import { ProfileWidget } from '../../widgets/profileWidget';

import { useAdmin } from '../../hooks/isAdmin';

import type { user } from '../../types';

const Profile = memo(() => {
  const dispatch = useAppDispatch();
  const { token, user, status } = useAppSelector((state) => state.auth);
  const isAdmin = useAdmin(user as user);

  useEffect(() => {
    dispatch(getme());
  }, []);
  return (
    <>
      {token ? (
        <ProfileWidget
          {...(user as user)}
          createBtnVisible={true}
          isAdmin={isAdmin}
          paramsId={user?._id}
        />
      ) : (
        <Auth />
      )}
    </>
  );
});
export default Profile;
