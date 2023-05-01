import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ConfirmDiolg } from '../dialog';
interface props {
  username: string;
  _id: string;
  roles: string[];
}
import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  deleteUser,
  blockUser,
  makeAdmin,
  getUsers,
  openConfirm,
} from '../../redux/auth';

const checkUSerRoel = (role: string, usersRoles: string[]) => {
  return usersRoles.includes(role);
};

export const AllUsers: FC<props> = ({ username, _id, roles }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const [toDelete, setTodelete] = useState(false);
  const { t } = useTranslation();

  const [blockStatus, setBlockStatus] = useState<boolean>(
    checkUSerRoel('BLOCKED', roles)
  );
  const [adminStatus, setAdminStatusStatus] = useState<boolean>(
    checkUSerRoel('ADMIN', roles)
  );

  const handleBlock = () => {
    dispatch(blockUser(_id));
    setBlockStatus((prev) => !prev);
  };
  const handleDeleteUser = () => {
    dispatch(deleteUser(_id));
  };
  const handleAdmin = () => {
    dispatch(makeAdmin(_id));
    setAdminStatusStatus((prev) => !prev);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [status]);
  return (
    <>
      {toDelete && <ConfirmDiolg deleteFunction={handleDeleteUser} />}

      <div className="flex items-center shadow-xl  justify-between  mt-5 rounded-lg p-5 hover:bg-[#98c5f380] transition-all">
        {username}
        <div className="flex gap-2 items-center ">
          <Link to={`/user/${_id}`}>
            <Button variant="outlined">{translate.t('userProfile')}</Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(openConfirm(true));
              setTodelete((prev) => !prev);
            }}
          >
            delete user
          </Button>
          {blockStatus ? (
            <Button variant="outlined" onClick={handleBlock}>
              unblock
            </Button>
          ) : (
            <Button variant="outlined" color="error" onClick={handleBlock}>
              Block
            </Button>
          )}
          {adminStatus ? (
            <Button variant="outlined" onClick={handleAdmin}>
              make user
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleAdmin}>
              make admin
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
