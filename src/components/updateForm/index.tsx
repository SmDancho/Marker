import { useEffect, useState, useCallback ,useMemo} from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Select, MenuItem, Alert, TextField } from '@mui/material';
import { getPostById } from '../../redux/posts';
import { updatePost } from '../../redux/posts';

import LoadingButton from '@mui/lab/LoadingButton';

import translate from '../../utils/i18/i18n';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { specificPost, status, isLoading } = useAppSelector(
    (state) => state.userPosts
  );
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [text, setText] = useState(specificPost?.text);
  const [updatedTitle, setUpdateTitle] = useState(specificPost?.title);
  const [updatedTopic, setUpdateTopic] = useState(specificPost?.topic);
  const [updatedRaiting, setUpdateRaiting] = useState<number>(
    specificPost?.authorRaiting as number
  );

  const delay = 1000;
  const changeText = useCallback((value: string) => {
    setText(value);
  }, []);

  const textEditorOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: 'demo',
        delay,
      },
    };
  }, [delay]);

  useEffect(() => {
    if (!user) {
      navigate('/Profile');
    }

    dispatch(getPostById(id as string));
  }, [id]);

  return (
    <>
      {status && (
        <Alert variant="outlined" severity="info" className='mt-10'>
          {status}
        </Alert>
      )}
      {specificPost && (
        <form
          className="flex gap-5 flex-col mt-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            className="w-full"
            label="Title"
            defaultValue={`${specificPost?.title}`}
            variant="outlined"
            onChange={(e: any) => {
              setUpdateTitle(e.target.value);
            }}
          />

          <TextField
            className="w-full"
            label="Topic"
            defaultValue={`${specificPost?.topic}`}
            variant="outlined"
            onChange={(e: any) => {
              setUpdateTopic(e.target.value);
            }}
          />
          <Select
            labelId="your-mark"
            defaultValue={specificPost?.authorRaiting}
            value={updatedRaiting}
            onChange={(e) => setUpdateRaiting(e.target.value as number)}
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
          <div className="h-[400px] mb-10">
            <SimpleMDE
              value={text}
              onChange={changeText}
              options={textEditorOptions}
            />
          </div>

          <LoadingButton
            loading={isLoading}
            variant="outlined"
            onClick={() => {
              dispatch(
                updatePost({
                  postId: id as string,
                  text: text as string,
                  title: updatedTitle as string,
                  topic: updatedTopic as string,
                  authorRaiting: updatedRaiting,
                })
              );
            }}
          >
            {translate.t('update')}
          </LoadingButton>
        </form>
      )}
    </>
  );
};
export default UpdateForm;
