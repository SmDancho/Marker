import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { getAllPosts } from '../../redux/posts';
import Avatar from '@mui/material/Avatar';
import type { RootState } from '../../redux/store';

import { PostCard } from '../../entities/postCard';
export const MainPage = () => {


  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state: RootState) => state.userPosts);
  const { user } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="flex justify-between">
      <div>
        {posts.map((post) => (
          <PostCard {...post} key={post._id} />
        ))}
      </div>
      <div className="flex flex-col max-h-[300px] w-[300px] justify-between items-center mt-10 shadow-lg">
        <div>
          <Avatar alt={user?.username} src="/static/images/avatar/1.jpg" />
          <div className='mt-5 font-bold text-lg'>{user?.username}</div>
        </div>
      </div>
    </div>
  );
};
