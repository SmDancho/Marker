import { useAppSelector } from '../../redux/store';
import { UserPostCard } from '../../entities/userPostCard';
import type { post } from '../../types';

export const UserPosts = () => {
  const { UserPost } = useAppSelector((state) => state.userPosts);

  return (
    <div className='flex flex-col w-full'>
      {UserPost?.map((item) => (
        <UserPostCard {...item}  />
      ))}
    </div>
  );
};
