import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

import { FileUploader } from 'react-drag-drop-files';
import SimpleMDE from 'react-simplemde-editor';

import { addpost, getTags } from '../../redux/posts';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useState, useMemo, useEffect } from 'react';
import { useDebounce } from '../../hooks/debonce';

import 'easymde/dist/easymde.min.css';

const PostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [image, setImg] = useState<File>();
  const [text, setText] = useState<string>('');
  const [group, setGroup] = useState<string>('');

  const [tagString, setTagsString] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const [authorRaiting, setAuthorRaiting] = useState<number>(0);

  const deboncedValue: string = useDebounce(tagString);
  const fileTypes = ['JPG', 'PNG', 'GIF'];
  const { isLoading, allTags, error } = useAppSelector(
    (state) => state.userPosts
  );

  const { user, viewUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

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

  const textOptions = useMemo(() => {
    return {
      spellChecker: false,
      placeholder: 'Review',
      autosave: {
        uniqueId: 'demo',
        enabled: true,
        delay: 1000,
      },
    };
  }, []);

  return (
    <>
      {error === 'fill all required fields' && (
        <Alert severity="error" className="mt-10">
          {error}
        </Alert>
      )}
      <form className=" top-0 right-0 bottom-0 left-0 w-full mt-10 mb-10 flex flex-col justify-center m-auto gap-5 ">
        <div className="flex justify-between gap-2">
          <TextField
            className="w-full"
            label="*Title"
            variant="outlined"
            helperText="Title is required"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            className="w-full"
            label="*Topic"
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
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
        />

        <InputLabel id="your-mark">*your mark (from 1 to 10)</InputLabel>
        <Select
          className="w-[10%]"
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

        <InputLabel id="demo-simple-select-label">*Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={group}
          onChange={(e) => setGroup(e.target.value as string)}
        >
          <MenuItem value={'Games'}>Games</MenuItem>
          <MenuItem value={'Books'}>Books</MenuItem>
          <MenuItem value={'Movies'}>Movies</MenuItem>
        </Select>

        <SimpleMDE
          value={text}
          options={textOptions}
          onChange={(text: string) => {
            setText(text);
          }}
        />

        <div className="flex gap-5 ">
          <p className="flex items-center ">
            {image ? (
              image.name
            ) : (
              <FileUploader
                handleChange={(file: File) => setImg(file)}
                name="file"
                types={fileTypes}
                className="w-full"
              />
            )}
          </p>
        </div>
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </LoadingButton>
      </form>
    </>
  );
};
export default PostForm;
