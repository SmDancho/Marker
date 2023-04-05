import { Header } from './components/header';
import { Profile } from './Pages/profile';
import { MainPage } from './Pages/Main';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Header />
      <div className="w-[1440px] m-auto h-[100px] ">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
