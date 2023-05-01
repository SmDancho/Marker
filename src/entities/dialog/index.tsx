import { useState, FC } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Button,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import translate from '../../utils/i18/i18n';
import { openConfirm } from '../../redux/auth';

import { useAppDispatch, useAppSelector } from '../../redux/store';

interface props {

  deleteFunction: () => void;
}
export const ConfirmDiolg: FC<props> = ({deleteFunction}) => {
  const { isOpenConfirm } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { viewUser, user } = useAppSelector((state) => state.auth);
  return (
    <Dialog
      open={isOpenConfirm}
      onClose={() => dispatch(openConfirm(false))}
      PaperComponent={Paper}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {translate.t('warning')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{translate.t('toDelete')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => dispatch(openConfirm(false))}>
          {translate.t('cancel')}
        </Button>
        <Button
          color="error"
          onClick={() => {
            dispatch(openConfirm(false));
            deleteFunction()
          }}
        >
          {translate.t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
