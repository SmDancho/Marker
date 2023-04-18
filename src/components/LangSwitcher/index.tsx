import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import translate from '../../utils/i18/i18n';

import { useState, useEffect } from 'react';
export const LangSwitcher = () => {
  const [lang, setLang] = useState<string>('en');

  const handleLangChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
    localStorage.setItem('lang', event.target.value);
    translate.changeLanguage(event.target.value);
  };

  useEffect(() => {
    setLang(localStorage.getItem('lang') as string);
  });
  
  return (
    <>
      <Select
        className="max-w-[100px] h-[40px]"
        labelId="demo-select-small"
        value={lang}
        onChange={(e) => handleLangChange(e)}
      >
        <MenuItem value={'en'}>Eng</MenuItem>
        <MenuItem value={'ru'}>Rus</MenuItem>
      </Select>
    </>
  );
};
