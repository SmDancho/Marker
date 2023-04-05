import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useState } from 'react';
import { RootState } from '../../redux/store';
import { registerUser, loginUser, getme } from '../../redux/auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export const Auth = () => {
  const [register, setRegister] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="m-auto h-[100vh] flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-[550px] gap-4"
      >
        {status && <Alert severity="info">{status}</Alert>}

        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            register
              ? dispatch(
                  registerUser({
                    username,
                    password,
                  })
                )
              : dispatch(
                  loginUser({
                    username,
                    password,
                  })
                );
          }}
        >
          {register ? 'Register' : 'Log in'}
        </Button>
        <span
          className="cursor-pointer"
          onClick={() => setRegister((prev) => !prev)}
        >
          or {register ? 'Log in' : 'Register'}
        </span>
      </form>
    </div>
  );
};
