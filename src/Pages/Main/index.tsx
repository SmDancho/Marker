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
    <div className="flex justify-center lg:justify-start max-w-[1000px]">
      <div className=" ">
        {posts.map((post) => (
          <PostCard {...post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
