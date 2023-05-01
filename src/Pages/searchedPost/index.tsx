import { useAppSelector, useAppDispatch } from '../../redux/store';
import { PostCard } from '../../entities/postCard';

const SearchedPostsPage = () => {
  const { searchedPosts } = useAppSelector((state) => state.userPosts);
  const isRequestSuccess = searchedPosts.length ? true : false;
  console.log(isRequestSuccess);
  return (
    <div className=" flex flex-col justify-between">
      {isRequestSuccess ? (
        searchedPosts?.map((post) => <PostCard {...post} key={post._id} />)
      ) : (
        <div className='flex justify-center mt-20 font-bold text-3xl'>Nothing found</div>
      )}
    </div>
  );
};
export default SearchedPostsPage;
