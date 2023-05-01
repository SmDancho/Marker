import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import translate from '../../utils/i18/i18n';

enum langType {
  ru = 'ru',
  en = 'en',
}

import { useState, useEffect } from 'react';
export const LangSwitcher = () => {
  const [lang, setLang] = useState<langType>(
    localStorage.getItem('lang') as langType
  );

  const handleLangChange = (event: SelectChangeEvent<langType>) => {
    setLang(event.target.value as langType);
    localStorage.setItem('lang', event.target.value);
    translate.changeLanguage(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem('lang', lang);

    translate.changeLanguage(lang);
  }, []);

  return (
    <>
      <Select
        className="max-w-[100px] h-[40px] "
        labelId="demo-select-small"
        value={lang}
        onChange={(e) => handleLangChange(e)}
      >
        <MenuItem value={langType.en}>Eng</MenuItem>
        <MenuItem value={langType.ru}>Rus</MenuItem>
      </Select>
    </>
  );
};
