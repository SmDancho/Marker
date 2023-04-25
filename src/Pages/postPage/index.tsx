import { useEffect, useMemo, useState, memo } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import { useAvergeRaiting } from '../../hooks/avergeRaiting';
const PostPage = () => {
  const { specificPost, status } = useAppSelector((state) => state.userPosts);
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();

  const [commentText, setCommentText] = useState<string>('');

  const dispatch = useAppDispatch();

  const avergeRaiting = useAvergeRaiting(specificPost?.raiting);

  const isLiked = () => {
    return specificPost?.likes.some((like) => like === user?._id);
  };

  useEffect(() => {
    dispatch(getPostById(id as string));
    dispatch(getme());
  }, [status]);

  const handleLike = () => {
    dispatch(likePost(id as string));
  };

  const handleComment = () => {
    dispatch(addComment({ _id: id as string, commentText }));
  };
  const handleRaiting = (newValue: number | null) => {
    dispatch(addRaiting({ _id: id as string, value: newValue as number }));
  };

  return (
    <section className="p-20 ">
      <div className="flex gap-10 flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">{specificPost?.title}</h1>
          <Rating
            name="simple-controlled"
            value={avergeRaiting}
            onChange={(event, newValue) => {
              handleRaiting(newValue);
            }}
          />
        </div>

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

        <ReactMarkdown children={specificPost?.text as string} />

        <div>
          <div
            className="cursor-pointer flex items-center gap-2 max-w-[50px]"
            onClick={() => handleLike()}
          >
            {isLiked() ? <ThumbUpAltIcon /> : <ThumbUpOutlinedIcon />}

            <span>{specificPost?.likes.length}</span>
          </div>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <TextField
              value={commentText}
              label="comment"
              variant="outlined"
              className=" w-full"
              onChange={(e: any) => {
                setCommentText(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setCommentText('');
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                handleComment();
                setCommentText('');
              }}
            >
              Send
            </Button>
          </div>
          <div>
            {specificPost?.comments.map((comment) => (
              <div className="flex gap-5 items-center mt-10" key={comment._id}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
