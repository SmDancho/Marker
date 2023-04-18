import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { Link } from 'react-router-dom';

import { search } from '../../redux/posts';

import { useDebounce } from '../../hooks/debonce';
import { useAppDispatch } from '../../redux/store';
import { useState } from 'react';
export const Search = () => {
  const [searchRequest, setSearchRequest] = useState<string>('');
  const dispatch = useAppDispatch();
  const debonced = useDebounce(searchRequest);
  const handleSearch = () => {
    dispatch(search(debonced));
  };

  return (
    <>
      <TextField
        label="Search field"
        type="search"
        variant="outlined"
        onChange={(e) => {
          setSearchRequest(e.target.value);
        }}
      />
      <Link to={'/search'}>
        <IconButton type="button" aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Link>
    </>
  );
};
