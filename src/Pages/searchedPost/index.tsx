import { useAppSelector, useAppDispatch } from '../../redux/store';
import { PostCard } from '../../entities/postCard';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';


const SearchedPostsPage = () => {
  const { searchedPosts } = useAppSelector((state) => state.userPosts);
  const isRequestSuccess = searchedPosts.length ? true : false;
  const { t } = useTranslation();

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
