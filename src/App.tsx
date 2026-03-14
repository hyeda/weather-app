import { Routes, Route } from 'react-router-dom';
import { Providers } from './app/providers';
import { HomePage } from './pages/home/ui/HomePage';
import { DetailPage } from './pages/detail/ui/DetailPage';

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:locationId" element={<DetailPage />} />
      </Routes>
    </Providers>
  );
}

export default App;