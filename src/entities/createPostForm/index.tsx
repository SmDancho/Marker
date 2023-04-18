import { useState, useMemo, useEffect } from 'react';
import { useDebounce } from '../../hooks/debonce';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

import { FileUploader } from 'react-drag-drop-files';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { addpost, saveTags, getTags } from '../../redux/posts';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { RootState } from '../../redux/store';

export const PostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [image, setImg] = useState<{ name: string }>();
  const [text, setText] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [tagsState, setTags] = useState<string>('');
  const [authorRaiting, setAuthorRaiting] = useState<unknown | null>(null);

  const deboncedValue: string = useDebounce(tagsState);
  const fileTypes = ['JPG', 'PNG', 'GIF'];
  const { tags, isLoading, allTags, error } = useAppSelector(
    (state: RootState) => state.userPosts
  );

  const dispatch = useAppDispatch();

  useMemo(() => {
    if (deboncedValue) {
      dispatch(saveTags(deboncedValue));
    }
  }, [deboncedValue]);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const hnadleSubmit = () => {
    dispatch(
      addpost({
        title,
        topic,
        image,
        text,
        group,
        tags,
        authorRaiting: authorRaiting as number,
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
          options={tagsOption}
          getOptionLabel={(option) => {
            return option;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Tags"
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
          )}
        />
        <TextField
          label="*Author raiting"
          helperText="authorRaiting is required"
          variant="outlined"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAuthorRaiting(e.target.value as unknown);
          }}
        />
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
                handleChange={(file: any) => setImg(file)}
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
            hnadleSubmit();
          }}
        >
          Create
        </LoadingButton>
      </form>
    </>
  );
};
