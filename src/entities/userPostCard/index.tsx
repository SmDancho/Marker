import { FC, useState } from 'react';
import { post } from '../../types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import { ConfirmDiolg } from '../dialog';

import { useAppDispatch, useAppSelector } from '../../redux/store';

import { openConfirm } from '../../redux/auth';
import { deletePost } from '../../redux/posts';

import { useTranslation } from 'react-i18next';
import translate from '../../utils/i18/i18n';

export const UserPostCard: FC<post> = ({ title, _id }) => {
  const dispatch = useAppDispatch();
  const [toDelete, setTodelete] = useState(false);
  const { user, viewUser } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const handleDeletePost = () => {
    dispatch(
      deletePost({
        postId: _id,
        userId: (viewUser?._id as string) || (user?._id as string),
      })
    );
  };

  return (
    <>
      {toDelete && <ConfirmDiolg deleteFunction={handleDeletePost} />}

      <div className="flex  shadow-xl  flex-col lg:flex-row justify-between  mt-5 rounded-lg p-5 hover:bg-[#98c5f380] transition-all">
        <div className="mb-2 lg:mb-0">{title}</div>

        <div className="flex gap-2 items-center ">
          <Link to={`/Post/${_id}`}>
            <Button variant="outlined"> {translate.t('post')}</Button>
          </Link>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setTodelete((prev) => !prev);
              dispatch(openConfirm(true));
            }}
          >
            {translate.t('delete')}
          </Button>

          <Link to={`/Update/${_id}`}>
            <Button variant="outlined"> {translate.t('update')}</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
