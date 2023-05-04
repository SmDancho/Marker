import { useState, useMemo, useEffect } from 'react';

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

import 'react-quill/dist/quill.snow.css';

const PostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fileTypes = ['JPG', 'PNG', 'GIF'];
  const delay = 1000;

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

  const tagsOption: string[] = [...allTags];
  tagsOption.push(deboncedValue);


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],
    ],
  };

  return (
    <>
      {error && (
        <Alert severity="error" className="mt-10">
          {error}
        </Alert>
      )}
      <form className=" top-0 right-0 bottom-0 left-0 w-full mt-10 mb-10 flex flex-col justify-center m-auto gap-5 ">
        <div className="flex justify-between gap-2">
          <TextField
            className="w-full"
            label={translate.t('title')}
            variant="outlined"
            helperText="Title is required"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            className="w-full"
            label={translate.t('topic')}
            helperText="Title is required"
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
          <MenuItem value={'Games'}>Games</MenuItem>
          <MenuItem value={'Books'}>Books</MenuItem>
          <MenuItem value={'Movies'}>Movies</MenuItem>
        </Select>

        <div className="h-[400px]">
          <ReactQuill
            theme="snow"
            value={text}
            modules={modules}
            onChange={(text) => setText(text)}
            className="h-[350px]"
          />
        </div>

        <div className="flex gap-5 ">
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
