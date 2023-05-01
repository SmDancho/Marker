import { useState, useEffect, useMemo, memo, lazy } from 'react';
import { FC } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout, getUsers } from '../../redux/auth';
import { getUserPosts } from '../../redux/posts';

import { AllUsers } from '../../entities/allUsersCard';

import { UserPosts } from '../userPosts';

import translate from '../../utils/i18/i18n';

const PostForm = lazy(() => import('../../components/createPostForm'));

interface props {
  username: string;
  _id: string;
  createBtnVisible: boolean;
  isAdmin?: boolean;
  paramsId?: string | undefined;
}

export const ProfileWidget: FC<props> = memo(
  ({ username, createBtnVisible, isAdmin, _id }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [isOpenForm, setIsOpenForm] = useState(false);

    const { allUsers } = useAppSelector((state) => state.auth);
    const { UserPost, status } = useAppSelector((state) => state.userPosts);

    const handelOpenForm = () => {
      setIsOpenForm((prev) => !prev);
    };

    useEffect(() => {
      status === 'Created successfully' && setIsOpenForm(false);

      dispatch(getUserPosts(_id as string));
      dispatch(getUsers());
    }, [status, _id]);

    const userLikes = UserPost?.map((post) => post.likes);

    return (
      <div>
        <div className="flex justify-between mt-5 items-center">
          <div className="flex items-center gap-2">
            <Avatar alt={`${username}`} src="/static/images/avatar/1.jpg" />
            <div>
              <div className="flex gap-3">
                <div className="font-bold">{username}</div>
                {isAdmin && (
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    Admin
                  </span>
                )}
              </div>

              <div>likes {userLikes[0]?.length}</div>
            </div>
          </div>
          <div>
            {createBtnVisible && (
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                {translate.t('logOut')}
              </Button>
            )}
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

        <section className="mt-5">
          {isAdmin &&
            allUsers
              ?.filter((users) => users.username !== username)
              .map((user) => <AllUsers {...user} key={user._id} />)}
        </section>
      </div>
    );
  }
);
