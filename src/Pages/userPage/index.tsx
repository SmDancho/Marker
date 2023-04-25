import { MemoizedProfileWidget } from '../../widgets/profileWidget';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import type { user } from '../../types';

import { useAdmin } from '../../hooks/isAdmin';
import { getUserByID, getme } from '../../redux/auth';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { user, viewUser } = useAppSelector((state) => state.auth);
  const isAdmin = useAdmin(user as user);

  useEffect(() => {
    dispatch(getUserByID(id as string));
    dispatch(getme());
  }, []);
  return isAdmin ? (
    <MemoizedProfileWidget {...(viewUser as user)} createBtnVisible={false} />
  ) : (
    <div>acces denied</div>
  );
};
export default UserPage;
