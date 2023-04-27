import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { Header } from './widgets/header';
import { MainPage } from './Pages/Main';

const ProfilePage = lazy(() => import('./Pages/profile'));
const PostPage = lazy(() => import('./Pages/postPage'));
const SearchedPostsPage = lazy(() => import('./Pages/searchedPost'));
const UserPage = lazy(() => import('./Pages/userPage'));
const UpdateForm = lazy(() => import('./components/updateForm'));

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  useEffect(() => {
    const handleStorageChange = () => {
      setMode(localStorage.getItem('theme') as 'light' | 'dark');
    };

    window.addEventListener('storageUpdated', () => handleStorageChange());

    return () => {
      window.removeEventListener('storageUpdated', () => handleStorageChange());
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth='xl'>
          <CssBaseline />
          <Header />
          <Suspense
            fallback={
                <div className="flex w-full h-[100vh] justify-center items-center" >
                  <CircularProgress />
                </div>
            }
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="/Post/:id" element={<PostPage />} />
              <Route path="/Update/:id" element={<UpdateForm />} />
              <Route path="/search" element={<SearchedPostsPage />} />
              <Route path="/search" element={<SearchedPostsPage />} />
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>
          </Suspense>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
