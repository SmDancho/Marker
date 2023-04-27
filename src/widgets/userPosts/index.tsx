import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState, useEffect } from 'react';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { useAppSelector, useAppDispatch } from '../../redux/store';
import { filteredPosts } from '../../redux/selectors/filter';

import { UserPostCard } from '../../entities/userPostCard';
import { useAvergeRaiting } from '../../hooks/avergeRaiting';

import type { post } from '../../types';

import { activeFilter, activeFilterByType } from '../../redux/posts';
import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';

export const UserPosts = () => {
  const dispatch = useAppDispatch();
  const filtered = useAppSelector(filteredPosts);
  const { t } = useTranslation();

  const [type, setType] = useState<string>('All');
  const [kindOfSort, setKindOfSort] = useState<
    'raiting' | 'userRaiting' | 'likes'
  >('likes');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    dispatch(activeFilter(kindOfSort));
    dispatch(activeFilterByType(type));
  }, [kindOfSort, type]);
  return (
    <div className="flex flex-col w-full ">
      <div className=" flex flex-col justify-between items-start mt-10 md:flex-row md:items-center">
        <div className="flex justify-start">
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
      {filtered.map((item) => (
        <UserPostCard {...item} key={item._id} />
      ))}
    </div>
  );
};
