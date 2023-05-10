import { useState, useEffect } from 'react';

import {
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
  Alert,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { FileUploader } from 'react-drag-drop-files';

import { addpost, getTags } from '../../redux/posts';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useDebounce } from '../../hooks/debonce';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import translate from '../../utils/i18/i18n';

import ReactQuill from 'react-quill';
import { modules } from '../../utils/cfgForTextEditor';

import 'react-quill/dist/quill.snow.css';

const PostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fileTypes = ['JPG', 'PNG', 'GIF', 'WEBP'];

  const [title, setTitle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [image, setImg] = useState<File[]>([]);
  const [text, setText] = useState<string>('');
  const [group, setGroup] = useState<string>('');

  const [tagString, setTagsString] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const [authorRaiting, setAuthorRaiting] = useState<number>(0);

  const deboncedValue: string = useDebounce(tagString);

  const { isLoading, allTags, error, status } = useAppSelector(
    (state) => state.userPosts
  );
  const { user, viewUser } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getTags());
    if (status === 'Created successfully') {
      navigate('/Profile');
    }
    if (!user) {
      navigate('/Profile');
    }
  }, [status]);

  const handleSubmit = () => {
    dispatch(
      addpost({
        title,
        topic,
        image,
        text,
        group,
        tags: activeTags,
        authorRaiting: authorRaiting,
        userId: viewUser?._id || user?._id,
      })
    );
  };
  const dleteDuplicates = new Set(allTags);
  const tagsOption: string[] = [...dleteDuplicates];
  tagsOption.push(deboncedValue);

  return (
    <>
      {error === 'fill all required fields' && (
        <Alert severity="error" className="mt-10">
          {error}
        </Alert>
      )}
      <form className=" top-0 right-0 bottom-0 left-0 w-full mt-10 mb-10 flex flex-col justify-center m-auto gap-5 ">
        <div className="flex gap-2">
          <TextField
            className="w-full"
            label={translate.t('title')}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            className="w-full"
            label={translate.t('topic')}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTopic(e.target.value);
            }}
          />
        </div>

        <Autocomplete
          multiple
          id="tags-filled"
          options={tagsOption}
          freeSolo
          onChange={(_, newValue) => {
            setActiveTags(newValue);
          }}
          onInputChange={(_, newInputValue) => {
            setTagsString(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={translate.t('tags')}
              placeholder="Favorites"
            />
          )}
        />

        <InputLabel id="your-mark">{translate.t('mark')}</InputLabel>

        <Select
          labelId="your-mark"
          value={authorRaiting}
          onChange={(e) => setAuthorRaiting(e.target.value as number)}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>

        <InputLabel id="demo-simple-select-label">
          {translate.t('group')}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={group}
          onChange={(e) => setGroup(e.target.value as string)}
        >
          <MenuItem value={'Games'}>{translate.t('games')}</MenuItem>
          <MenuItem value={'Books'}>{translate.t('books')}</MenuItem>
          <MenuItem value={'Movies'}>{translate.t('movies')}</MenuItem>
        </Select>

        <ReactQuill
          value={text}
          modules={modules}
          onChange={(text) => setText(text)}
          className="max-h-[340px]"
        />
        <div className="flex gap-5 flex-col">
          <span>{translate.t("preview")}</span>
          <FileUploader
            handleChange={(file: File) => setImg([...image, file])}
            name="file"
            types={fileTypes}
          />
          {image && image.map((img) => <p>{img.name}</p>)}
        </div>
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          onClick={() => {
            handleSubmit();
          }}
        >
          {translate.t('create')}
        </LoadingButton>
      </form>
    </>
  );
};
export default PostForm;
