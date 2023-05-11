import { useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { PostPageWidget } from '../../widgets/postPageWidget';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { getme } from '../../redux/auth';
import { getPostById } from '../../redux/posts';

const PostPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { specificPost } = useAppSelector((state) => state.userPosts);

  useEffect(() => {
    dispatch(getPostById(id as string));
    dispatch(getme())
    const interval = setInterval(() => {
      dispatch(getPostById(id as string));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return specificPost && <PostPageWidget {...specificPost} />;
};

export default PostPage;
