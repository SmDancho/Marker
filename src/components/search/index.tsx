import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

import { search } from '../../redux/posts';

import { useDebounce } from '../../hooks/debonce';
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import translate from '../../utils/i18/i18n';

import { useNavigate } from 'react-router-dom';
export const Search = () => {
  const [searchRequest, setSearchRequest] = useState<string>('');

  const dispatch = useAppDispatch();
  const debonced = useDebounce(searchRequest, 500);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    dispatch(search(debonced));
  };

  return (
    <div className="max-w-[600px]">
      <TextField
        label={translate.t('search')}
        type="search"
        variant="outlined"
        onChange={(e) => {
          setSearchRequest(e.target.value);
          navigate('/search');
        }}
        className="w-full"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        onKeyUp={(e) => {
          e.key === 'Enter' ? handleSearch() : false;
        }}
      />
      <span className="text-sm hidden lg:block">
        {translate.t('pressEnter')}
      </span>
    </div>
  );
};
