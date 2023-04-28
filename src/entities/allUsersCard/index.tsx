import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

interface props {
  username: string;
  _id: string;
}
import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';

export const AllUsers: FC<props> = ({ username, _id }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center shadow-xl  justify-between  mt-5 rounded-lg p-5 hover:bg-[#98c5f380] transition-all">
      {username}
      <div className="flex gap-2 items-center ">
        <Link to={`/user/${_id}`}>
          <Button variant="outlined">{translate.t('userProfile')}</Button>
        </Link>
      </div>
    </div>
  );
};
