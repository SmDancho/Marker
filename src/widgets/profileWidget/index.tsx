import { useState, useEffect } from 'react';
import { FC } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout, getUsers } from '../../redux/auth';
import { getUserPosts } from '../../redux/posts';

import { PostForm } from '../../components/createPostForm';
import { AllUsers } from '../../entities/allUsersCard';

import { UserPosts } from '../userPosts';

import translate from '../../utils/i18/i18n';

interface props {
  username: string;
  _id: string;
  createBtnVisible: boolean;
  isAdmin?: boolean;
  paramsId?: string | undefined;
}

export const ProfileWidget: FC<props> = ({
  username,
  createBtnVisible,
  isAdmin,
  _id,
}) => {
  const [isOpenForm, setisOpenForm] = useState(false);
  const { status } = useAppSelector((state) => state.userPosts);
  const { user, allUsers } = useAppSelector((state) => state.auth);
  const { UserPost } = useAppSelector((state) => state.userPosts);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handelOpenForm = () => {
    setisOpenForm((prev) => !prev);
  };

  useEffect(() => {
    if (status === 'Created successfully') {
      setisOpenForm(false);
    }
    dispatch(getUserPosts(_id as string));

    dispatch(getUsers());
  }, [status, user?._id]);

  const userLieks = UserPost?.map((post) => post.likes);
  
  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <div className="flex items-center gap-2">
          <Avatar alt={`${username}`} src="/static/images/avatar/1.jpg" />
          <div>
            <div className="flex">
              <div className="font-bold">{username}</div>
              {isAdmin && <AdminPanelSettingsIcon />}
            </div>

            <div>likes {userLieks[0]?.length}</div>
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
            ?.filter((users) => users.username !== user?.username)
            .map((user) => <AllUsers {...user} />)}
      </section>
    </div>
  );
};
