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
  image: string[];
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
      <div className=" flex mt-10 justify-between m-auto flex-col rounded-lg cursor-pointer lg:flex-row ">
        <div className="rounded-lg w-[250px] h-[300px]">
          <img
            src={`${image[0]}`}
            alt="preview"
            className="block rounded-l-lg w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 w-full lg:pl-4">
          <div className="flex flex-col justify-between items-start w-full lg:flex-row lg:items-center ">
            <div className="font-bold text-xl lg:text-3xl">{title}</div>
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
