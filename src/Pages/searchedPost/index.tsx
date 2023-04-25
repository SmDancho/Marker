import { useAppSelector } from '../../redux/store';
import { PostCard } from '../../entities/postCard';

const SearchedPostsPage = () => {
  const { searchedPosts } = useAppSelector((state) => state.userPosts);
  return (
    <div className=" flex flex-col justify-between">
      {searchedPosts?.map((post) => (
        <PostCard {...post} key={post._id} />
      ))}
    </div>
  );
};
export default SearchedPostsPage;
