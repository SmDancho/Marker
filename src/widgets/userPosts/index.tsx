import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState } from 'react';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { useAppSelector } from '../../redux/store';
import { UserPostCard } from '../../entities/userPostCard';
import { useAvergeRaiting } from '../../hooks/avergeRaiting';

import type { post } from '../../types';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';

export const UserPosts = () => {
  const { UserPost } = useAppSelector((state) => state.userPosts);
  const { t } = useTranslation();

  const [type, setType] = useState<string>('All');

  const [kindOfSort, setKindOfSort] = useState<
    'raiting' | 'userRaiting' | 'likes'
  >('likes');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const multiSort = (a: post, b: post) => {
    const byLikes = b.likes.length - a.likes.length;
    const byUserRate = b.authorRaiting - a.authorRaiting;
    const byAvgRating =
      useAvergeRaiting(b.raiting) - useAvergeRaiting(a.raiting);

    if (kindOfSort === 'likes') {
      return byLikes;
    } else if (kindOfSort === 'userRaiting') {
      return byUserRate;
    } else {
      return byAvgRating;
    }
  };

  const sortedItems = UserPost?.filter((item) =>
    type === 'All' ? item : item.group === type
  ).sort((a, b) => multiSort(a, b));

  return (
    <div className="flex flex-col w-full ">
      <div className=" flex justify-between items-center mt-10">
        <div>
          <Select value={type} onChange={handleChange}>
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Games'}>Games</MenuItem>
            <MenuItem value={'Books'}>Books</MenuItem>
            <MenuItem value={'Movies'}>Movies</MenuItem>
          </Select>
        </div>
        <div>
          <RadioGroup>
            <div>
              <FormControlLabel
                control={<Radio />}
                label={translate.t('avergeRaiting')}
                value="raiting"
                className="flex"
                onClick={() => {
                  setKindOfSort('raiting');
                }}
              />
              <FormControlLabel
                value="userRaiting"
                onClick={() => {
                  setKindOfSort('userRaiting');
                }}
                control={<Radio />}
                label={translate.t('userRaiting')}
              />
              <FormControlLabel
                control={<Radio />}
                value="likes"
                onClick={() => {
                  setKindOfSort('likes');
                }}
                label={translate.t('likes')}
              />
            </div>
          </RadioGroup>
        </div>
      </div>
      {sortedItems.map((item) => (
        <UserPostCard {...item} />
      ))}
    </div>
  );
};
