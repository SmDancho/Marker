import { Header } from '../widgets/header';
import { Footer } from '../components/footer';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';

export const Layout = () => {
  return (
    <Container maxWidth="xl">
      <div className="min-h-[100%] flex flex-col">
        <CssBaseline />
        <Header />
        <main className='min-h-[100vh]'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Container>
  );
};
