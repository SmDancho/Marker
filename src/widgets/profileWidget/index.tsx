import { useState, useEffect, useMemo } from 'react';
import { FC } from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout, getUsers } from '../../redux/auth';
import { getUserPosts } from '../../redux/posts';

import { AllUsers } from '../../entities/allUsersCard';
import { UserPosts } from '../userPosts';

import translate from '../../utils/i18/i18n';
import { Link } from 'react-router-dom';

interface props {
  username: string;
  _id: string;
  createBtnVisible: boolean;
  isAdmin?: boolean;
  paramsId?: string | undefined;
}
enum TabsPropety {
  posts = 'posts',
  users = 'users',
}

export const ProfileWidget: FC<props> = ({
  username,
  createBtnVisible,
  isAdmin,
  _id,
}) => {
  const [tabs, setTabs] = useState<TabsPropety>(TabsPropety.posts);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { allUsers } = useAppSelector((state) => state.auth);
  const { UserPost, status } = useAppSelector((state) => state.userPosts);

  useEffect(() => {
    dispatch(getUserPosts(_id as string));
    if (isAdmin) {
      dispatch(getUsers());
    }
  }, [status, _id]);

  const userLikes = useMemo(() => UserPost?.map((post) => post?.likes), []);
  const handleChangeTabs = (_: React.SyntheticEvent, newValue: TabsPropety) => {
    setTabs(newValue);
  };
  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <div className="flex items-center gap-2">
          <Avatar />
          <div>
            <div>
              <div className="font-bold">{username}</div>
              {isAdmin && (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2  text-xs font-medium text-red-700  ring-inset ring-red-600/10">
                  Admin
                </span>
              )}
            </div>

            <div>likes {userLikes[0]?.length}</div>
          </div>
        </div>

        {createBtnVisible && (
          <IconButton
            onClick={() => {
              dispatch(logout());
            }}
          >
            <LogoutIcon />
          </IconButton>
        )}
      </div>
      <section className="mt-5 flex flex-col justify-between  lg:flex-row lg:items-center">
        <Tabs value={tabs} onChange={handleChangeTabs}>
          <Tab label={translate.t('posts')} value={TabsPropety.posts} />
          {isAdmin && (
            <Tab label={translate.t('users')} value={TabsPropety.users} />
          )}
        </Tabs>

        <div className="flex gap-2 mt-5 lg:mt-0">
          <div>
            <Link to={'/create'}>
              <Button variant="outlined">{translate.t('createReview')}</Button>
            </Link>
          </div>
        </div>
      </section>

      <TabContext value={tabs}>
        <TabPanel value={TabsPropety.posts}>
          <section className="flex gap-5 flex-wrap m-auto">
            <UserPosts />
          </section>
        </TabPanel>
        <TabPanel value={TabsPropety.users}>
          <section className="mt-5">
            {isAdmin &&
              allUsers
                ?.filter((users) => users.username !== username)
                .sort((a, b) => (a.username < b.username ? -1 : 1))
                .map((user) => <AllUsers {...user} key={user._id} />)}
          </section>
        </TabPanel>
      </TabContext>
    </div>
  );
};
