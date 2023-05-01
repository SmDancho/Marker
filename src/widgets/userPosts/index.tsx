import { memo } from 'react';

import { useAppSelector } from '../../redux/store';
import { filteredUserPosts } from '../../redux/selectors/filter';

import { UserPostCard } from '../../entities/userPostCard';

import { Filter } from '../../components/filters';
export const UserPosts = memo(() => {
  const filtered = useAppSelector(filteredUserPosts);

  return (
    <>
      <Filter />
      <div className="flex flex-col w-full ">
        {filtered.map((item) => (
          <UserPostCard {...item} key={item._id} />
        ))}
      </div>
    </>
  );
});
