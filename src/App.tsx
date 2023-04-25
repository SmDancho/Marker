import { useState, useEffect } from 'react';

import { Header } from './widgets/header';
import { Profile } from './Pages/profile';
import { MainPage } from './Pages/Main';
import { PostPage } from './Pages/postPage';
import { SearchedPostsPage } from './Pages/searchedPost';
import { UserPage } from './Pages/userPage';
import { Routes, Route } from 'react-router-dom';
import { UpdateForm } from './components/updateForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
        <div className="w-[1440px] m-auto  ">
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Post/:id" element={<PostPage />} />
            <Route path="/Update/:id" element={<UpdateForm />} />
            <Route path="/search" element={<SearchedPostsPage />} />
            <Route path="/search" element={<SearchedPostsPage />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
