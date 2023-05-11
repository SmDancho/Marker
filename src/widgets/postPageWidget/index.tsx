import { useState, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { likePost, addComment, addRaiting, search } from '../../redux/posts';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SendIcon from '@mui/icons-material/Send';

import { Rating, Avatar, TextField, IconButton } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import { useAvergeRaiting } from '../../hooks/avergeRaiting';

import type { post } from '../../types';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';
export const PostPageWidget: FC<post> = ({
  tags,
  author,
  likes,
  raiting,
  authorRaiting,
  text,
  comments,
  image,
  title,
  _id,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, token } = useAppSelector((state) => state.auth);

  const [commentText, setCommentText] = useState<string>('');
  const [isImgFullscreen, setImgFullscreen] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');

  const [likesState, setLikes] = useState<string[]>(likes as string[]);

  const { t } = useTranslation();
  const avergeRaiting = useAvergeRaiting(raiting);
  const isLiked = likesState?.includes(user?._id as string);
  useEffect(() => {
    setLikes(likes);
  }, [likes]);

  const handleLike = () => {
    if (!token) {
      navigate('/Profile');
    }

    isLiked
      ? setLikes((current) => current?.filter((id) => id !== user?._id))
      : setLikes([...likesState, user?._id as string]);
    dispatch(likePost(_id));
  };

  const handleComment = () => {
    if (!token) {
      navigate('/Profile');
    }
    commentText && dispatch(addComment({ _id, commentText }));
  };
  const handleRaiting = (rateValue: number) => {
    if (!token) {
      navigate('/Profile');
    }
    rateValue && dispatch(addRaiting({ _id, value: rateValue as number }));
  };

  const handleFullscreen = (url: string) => {
    setImgFullscreen(true);
    setImgUrl(url);
  };
  const searchBytag = (tag: string) => {
    dispatch(search(tag));
  };
  console.log(imgUrl);
  console.log(isImgFullscreen);
  return (
    <section className="p-5 lg:p-20 ">
      <div className="flex gap-10 flex-col ">
        <div className="flex flex-col  justify-between lg:flex-row ">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl">
            {title}
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
            {tags?.map((tag, index) => (
              <IconButton className="text-sm p-2">
                <li
                  key={index}
                  className="cursor-pointer text-sm"
                  onClick={() => {
                    navigate('/search');
                    searchBytag(tag);
                  }}
                >
                  #{tag}
                </li>
              </IconButton>
            ))}
          </ul>

          <div>author: {author}</div>
          <div>author raiting : {authorRaiting} / 10</div>
          <div>
            <img
              src={`${image[0]}`}
              alt="image"
              className="rounded-lg mt-10 mb-20 w-[300px] h-[450px] object-cover"
            />

            <span className="mb-20">{translate.t('img')}</span>

            <div className="flex gap-2  w-full relative">
              {isImgFullscreen && (
                <div className="flex w-full  justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-10 ">
                  <img
                    src={`${imgUrl}`}
                    alt="image"
                    onClick={() => setImgFullscreen(false)}
                    className=" min-w-[750px] min-h-[750px] rounded-lg  object-cover cursor-pointer"
                  />
                </div>
              )}
              {image
                .filter((img) => img !== image[0])
                .map((url) => (
                  <div>
                    <img
                      src={`${url}`}
                      alt="image"
                      onClick={() => handleFullscreen(url)}
                      className=" w-[150px] h-[150px] rounded-lg mt-10 mb-20 object-cover cursor-pointer"
                    />
                  </div>
                ))}
            </div>
            <ReactMarkdown children={text} />
          </div>
        </div>

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

            <span>{likesState?.length}</span>
          </div>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <Avatar alt={`${user?.username}`} />
            <div className="flex flex-col justify-between items-center w-full gap-2 lg:flex-row">
              <TextField
                value={commentText}
                label={translate.t('comment')}
                variant="outlined"
                className="w-full"
                onChange={(e: any) => {
                  setCommentText(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleComment();
                    setCommentText('');
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="cursor-pointer"
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
            {comments.map((comment) => (
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
