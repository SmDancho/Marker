import { memo } from 'react';

import { useAppSelector } from '../../redux/store';
import { filteredUserPosts } from '../../redux/selectors/filter';

import { UserPostCard } from '../../entities/userPostCard';

import { Filter } from '../../components/filters';
export const UserPosts = memo(() => {
  const filtered = useAppSelector(filteredUserPosts);

  return (
    <>
      <div className="flex flex-col w-full mt-5 mb-5">
        <Filter />

        {filtered.length ? (
          filtered.map((item) => <UserPostCard {...item} key={item._id} />)
        ) : (
          <div className="flex justify-center items-center">Empty :(</div>
        )}
      </div>
    </>
  );
});
