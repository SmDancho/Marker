import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/store';
import { getme } from '../../redux/auth';

import { Auth } from '../../components/Auth';
import { ProfileWidget } from '../../widgets/profileWidget';

import { useAdmin } from '../../hooks/isAdmin';

import type { user } from '../../types';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { token, user, status } = useAppSelector((state) => state.auth);
  const isAdmin = useAdmin(user as user);
  const [activeUser, setActiveUser] = useState<user>();

  useEffect(() => {
    dispatch(getme());
    setActiveUser(user as user);
  }, [status]);
  return (
    <>
      {token ? (
        <ProfileWidget
          {...(activeUser as user)}
          createBtnVisible={true}
          isAdmin={isAdmin}
          paramsId={user?._id}
        />
      ) : (
        <Auth />
      )}
    </>
  );
};
export default Profile;
