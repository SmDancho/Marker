import { FC } from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import type { raiting } from '../../types';

import { useAvergeRaiting } from './../../hooks/avergeRaiting';
interface props {
  author: string;
  title: string;
  topic: string;
  tags: string[];
  image: string;
  text: string;
  raiting: raiting[];
  _id: string;
}

export const PostCard: FC<props> = ({
  title,
  topic,
  tags,
  image,
  text,
  raiting,
  _id,
}) => {
  const avergeRaiting = useAvergeRaiting(raiting);
  return (
    <Link to={`/Post/${_id}`}>
      <div
        className="max-w-[900px] flex mt-10  rounded-lg cursor-pointer"
        onClick={() => console.log(_id)}
      >
        <div className="max-w-[400px] rounded-lg ">
          <img src={`${image}`} alt="" className="block rounded-l-lg " />
        </div>
        <div className="px-5 flex flex-col justify-between gap-2 max-w-[500px] w-[500px]">
          <div className="flex justify-between items-center w-full">
            <div className="font-bold  text-[1.8rem]">{title}</div>
            <Rating name="simple-controlled" value={avergeRaiting} readOnly />
          </div>

          <div>
            <ul className="flex gap-2">
              {tags.map((tag, index) => {
                return <li key={index}>#{tag}</li>;
              })}
            </ul>
          </div>

          <div className="text-lg">{topic}</div>

          <p className="max-w-[200px] truncate">{text}</p>
        </div>
      </div>
    </Link>
  );
};
