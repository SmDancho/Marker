import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { MainPage } from '../Pages/Main';

import { Layout } from '../layout';

const ProfilePage = lazy(() => import('../Pages/profile'));
const PostPage = lazy(() => import('../Pages/postPage'));
const SearchedPostsPage = lazy(() => import('../Pages/searchedPost'));
const UserPage = lazy(() => import('../Pages/userPage'));
const UpdateForm = lazy(() => import('../components/updateForm'));
const CreateForm = lazy(() => import('../components/createPostForm'));

export const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full h-[100vh] justify-center items-center">
          <CircularProgress />
        </div>
      }
    >
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Post/:id" element={<PostPage />} />
          <Route path="/Update/:id" element={<UpdateForm />} />
          <Route path="/search" element={<SearchedPostsPage />} />
          <Route path="/search" element={<SearchedPostsPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/create" element={<CreateForm />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
