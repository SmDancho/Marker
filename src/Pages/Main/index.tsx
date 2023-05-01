import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { getAllPosts } from '../../redux/posts';

import { PostCard } from '../../entities/postCard';
import { filteredAllPosts } from '../../redux/selectors/filter';

import { Filter } from '../../components/filters';
export const MainPage = () => {
  const filtered = useAppSelector(filteredAllPosts);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="flex justify-center flex-col lg:justify-start max-w-[1000px]">
      <Filter />
      <div>
        {filtered.map((post) => (
          <PostCard {...post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
