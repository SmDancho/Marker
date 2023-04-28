import { useEffect, useMemo, useState, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getPostById,
  likePost,
  addComment,
  addRaiting,
} from '../../redux/posts';
import { getme } from '../../redux/auth';

import Rating from '@mui/material/Rating';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import InputAdornment from '@mui/material/InputAdornment';
import { useAvergeRaiting } from '../../hooks/avergeRaiting';

const PostPage = () => {
  const dispatch = useAppDispatch();
  const { specificPost, status } = useAppSelector((state) => state.userPosts);
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();

  const [commentText, setCommentText] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);

  const avergeRaiting = useAvergeRaiting(specificPost?.raiting);

  const isLiked = specificPost?.likes.some((like) => like === user?._id);

  useEffect(() => {
    dispatch(getPostById(id as string));
    dispatch(getme());
    setLikes(specificPost?.likes.length as number);
  }, [status]);

  const handleLike = () => {
    dispatch(likePost(id as string));
    isLiked
      ? setLikes(specificPost?.likes.length)
      : setLikes(specificPost?.likes.length);
  };

  const handleComment = () => {
    commentText && dispatch(addComment({ _id: id as string, commentText }));
  };
  const handleRaiting = (rateValue: number) => {
    rateValue &&
      dispatch(addRaiting({ _id: id as string, value: rateValue as number }));
  };

  return (
    <section className="p-5 lg:p-20 ">
      <div className="flex gap-10 flex-col ">
        <div className="flex flex-col  justify-between lg:flex-row ">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl">
            {specificPost?.title}
          </h1>
          <Rating
            name="simple-controlled"
            value={avergeRaiting}
            onChange={(_, rateValue) => {
              handleRaiting(rateValue as number);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <ul className="flex gap-2">
            {specificPost?.tags.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>

          <div>author: {specificPost?.author}</div>
          <div>author raiting : {specificPost?.authorRaiting} / 10</div>
          <div>
            <img
              src={`${specificPost?.image}`}
              alt="image"
              className="block rounded-lg"
            />
          </div>
        </div>

        <ReactMarkdown children={specificPost?.text as string} />

        <div>
          <div
            className="cursor-pointer flex items-center gap-2 max-w-[50px]"
            onClick={() => handleLike()}
          >
            {isLiked ? (
              <IconButton>
                <ThumbUpAltIcon />
              </IconButton>
            ) : (
              <IconButton>
                <ThumbUpOutlinedIcon />
              </IconButton>
            )}

            <span>{likes}</span>
          </div>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <Avatar alt={`${user?.username}`} src="123" />
            <div className="flex flex-col justify-between items-center w-full gap-2 lg:flex-row">
              <TextField
                value={commentText}
                label="comment"
                variant="outlined"
                className=" w-full"
                onChange={(e: any) => {
                  setCommentText(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => {
                        handleComment();
                        setCommentText('');
                      }}
                    >
                      <SendIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div>
            {specificPost?.comments.map((comment) => (
              <div className="flex gap-5 items-center mt-10" key={comment._id}>
                <Avatar
                  alt={`${comment.username}`}
                  src="/static/images/avatar/1.jpg"
                />
                <div className="flex flex-col">
                  <div className="font-bold">{comment.username}</div>
                  <div>{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PostPage;
