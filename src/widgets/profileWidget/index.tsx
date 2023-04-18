import { useState, useEffect } from 'react';
import { FC } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/auth';
import { getUserPosts } from '../../redux/posts';

import { PostForm } from '../../entities/createPostForm';
import { UserPosts } from '../userPosts';

import type { user } from '../../types';
import translate from '../../utils/i18/i18n';

export const ProfileWidget: FC<user> = ({ username }) => {
  const [isOpenForm, setisOpenForm] = useState(false);
  const { status } = useAppSelector((state) => state.userPosts);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handelOpenForm = () => {
    setisOpenForm((prev) => !prev);
  };

  useEffect(() => {
    if (status === 'Created successfully') {
      setisOpenForm(false);
    }
    dispatch(getUserPosts());
  }, [status]);

  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <div className="flex items-center gap-2">
          <Avatar
            alt={`${username}`}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
          />
          <div>{username}</div>
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(logout());
            }}
          >
            {translate.t('logOut')}
          </Button>
        </div>
      </div>
      <section className="mt-5">
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              handelOpenForm();
            }}
          >
            {isOpenForm ? translate.t('close') : translate.t('createReview')}
          </Button>
        </div>
      </section>

      <section className="flex gap-5 flex-wrap m-auto">
        {isOpenForm ? <PostForm /> : <UserPosts />}
      </section>
    </div>
  );
};
