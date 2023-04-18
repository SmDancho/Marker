import { FC, useState } from 'react';
import { post } from '../../types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';

import { useAppDispatch } from '../../redux/store';
import { deletePost } from '../../redux/posts';

import { useTranslation } from 'react-i18next';
import translate from '../../utils/i18/i18n';

export const UserPostCard: FC<post> = ({ title, image, _id, text }) => {
  const [confirm, setConfirm] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <>
      <div className=" mt-5 w-[300px] rounded-lg p-2 hover:bg-[#98c5f380] transition-all">
        <Dialog
          open={confirm}
          onClose={() => setConfirm(false)}
          PaperComponent={Paper}
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Warning you are trying to delete post
          </DialogTitle>
          <DialogContent>
            <DialogContentText>To delete post press delete</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setConfirm(false)}>
              {translate.t('cancel')}
            </Button>
            <Button
              color="error"
              onClick={() => {
                setConfirm(false);
                dispatch(deletePost(_id));
              }}
            >
              {translate.t('delete')}
            </Button>
          </DialogActions>
        </Dialog>

        <div>{title}</div>
        <div className="w-fell h-[200px] mb-5">
          <img className="w-full h-full block" src={`${image}`} alt="" />
        </div>
        <div className="flex gap-2 items-center">
          <Link to={`/Post/${_id}`}>
            <Button variant="outlined"> {translate.t('post')}</Button>
          </Link>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setConfirm((confirm) => !confirm);
            }}
          >
            {translate.t('delete')}
          </Button>

          <Link to={`/Update/${_id}`}>
            <Button variant="outlined"> {translate.t('update')}</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
