import { useState, useEffect } from 'react';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';
import { activeFilter, activeFilterByType } from '../../redux/posts';

import { useAppDispatch } from '../../redux/store';

enum sortType {
  raiting = 'raiting',
  userRaiting = 'userRaiting',
  likes = 'likes',
}

export const Filter = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<string>('All');
  const [kindOfSort, setKindOfSort] = useState<sortType>(sortType.likes);
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  useEffect(() => {
    dispatch(activeFilter(kindOfSort));
    dispatch(activeFilterByType(type));
  }, [kindOfSort, type]);
  return (
    <div className="flex gap-5 items-start flex-col mt-10 md:flex-row md:items-center">
      <div>
        <Select value={type} onChange={handleChange}>
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Games'}>Games</MenuItem>
          <MenuItem value={'Books'}>Books</MenuItem>
          <MenuItem value={'Movies'}>Movies</MenuItem>
        </Select>
      </div>
      <RadioGroup>
        <div>
          <FormControlLabel
            control={<Radio />}
            label={translate.t('avergeRaiting')}
            value="raiting"
            className="flex"
            onClick={() => {
              setKindOfSort(sortType.raiting);
            }}
          />
          <FormControlLabel
            value="userRaiting"
            onClick={() => {
              setKindOfSort(sortType.userRaiting);
            }}
            control={<Radio />}
            label={translate.t('userRaiting')}
          />
          <FormControlLabel
            control={<Radio />}
            value="likes"
            onClick={() => {
              setKindOfSort(sortType.likes);
            }}
            label={translate.t('likes')}
          />
        </div>
      </RadioGroup>
    </div>
  );
};
