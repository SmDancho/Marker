import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

interface props {
  username: string;
  _id: string;
}

export const AllUsers: FC<props> = ({ username, _id }) => {
  return (
    <div className="flex items-center shadow-xl  justify-between  mt-5 rounded-lg p-5 hover:bg-[#98c5f380] transition-all">
      {username}
      <div className="flex gap-2 items-center ">
        <Link to={`/user/${_id}`}>
          <Button variant="outlined">user</Button>
        </Link>
      </div>
    </div>
  );
};
