import { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostPageWidget } from '../../widgets/postPageWidget';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { getme } from '../../redux/auth';
import { getPostById } from '../../redux/posts';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { specificPost, status } = useAppSelector(
    (state) => state.userPosts
  );
  useEffect(() => {
    dispatch(getPostById(id as string));
    dispatch(getme());
  }, [status]);

  return specificPost && <PostPageWidget {...specificPost} />;
};

export default PostPage;
