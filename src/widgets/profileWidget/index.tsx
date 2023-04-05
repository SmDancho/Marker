import { FC } from 'react';
import type { user } from '../../types';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/auth';

export const ProfileWidget: FC<user> = ({ username }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <div className="flex">
          <div className="w-[100px] h-[100px] bg-black rounded-full"></div>
          <ul>
            <li> Username: {username}</li>
          </ul>
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};
