import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { getPostById } from '../../redux/posts';
import { updatePost } from '../../redux/posts';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import SimpleMDE from 'react-simplemde-editor';
import { useParams } from 'react-router-dom';

 const UpdateForm = () => {
  const { specificPost, status, isLoading } = useAppSelector(
    (state) => state.userPosts
  );
  const dispatch = useAppDispatch();
  const [updatedText, setUpdateText] = useState(specificPost?.text);
  const [updatedTitle, setUpdateTitle] = useState(specificPost?.title);
  const [updatedTopic, setUpdateTopic] = useState(specificPost?.topic);
  const [updatedRaiting, setUpdateRaiting] = useState<number>(
    specificPost?.authorRaiting as number
  );

  const { id } = useParams();
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

  useEffect(() => {
    dispatch(getPostById(id as string));
  }, []);

  console.log(status);
  return (
    <>
      {status && (
        <Alert variant="outlined" severity="info">
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
          <TextField
            label="Author raiting"
            defaultValue={specificPost?.authorRaiting}
            variant="outlined"
            type="number"
            onChange={(e: any) => {
              setUpdateRaiting(e.target.value);
            }}
          />
          <SimpleMDE
            value={specificPost?.text}
            options={textOptions}
            onChange={(text: string) => {
              setUpdateText(text);
            }}
          />

          <LoadingButton
            loading={isLoading}
            variant="outlined"
            onClick={() => {
              dispatch(
                updatePost({
                  postId: id as string,
                  text: updatedText as string,
                  title: updatedTitle as string,
                  topic: updatedTopic as string,
                  authorRaiting: updatedRaiting,
                })
              );
            }}
          >
            Update
          </LoadingButton>
        </form>
      )}
    </>
  );
};
export default UpdateForm