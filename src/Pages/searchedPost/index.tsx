import { useAppSelector } from '../../redux/store';
import { PostCard } from '../../entities/postCard';
import { CircularProgress } from '@mui/material';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';

const SearchedPostsPage = () => {
  const { searchedPosts, isLoading } = useAppSelector(
    (state) => state.userPosts
  );
  const isRequestSuccess = searchedPosts.length ? true : false;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className=" flex flex-col justify-between">
      {isRequestSuccess ? (
        searchedPosts?.map((post) => <PostCard {...post} key={post._id} />)
      ) : (
        <div className="flex justify-center mt-20 font-bold text-3xl">
          {translate.t('NothingFound')}
        </div>
      )}
    </div>
  );
};
export default SearchedPostsPage;
