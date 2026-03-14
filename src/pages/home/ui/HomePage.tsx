import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/widgets/search-bar';
import type { Location } from '@/entities/location/model/types';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSelectLocation = (location: Location) => {
    navigate(`/detail/${location.id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center pt-20 px-4">
      <h1 className="text-white text-3xl font-bold mb-8">날씨 검색</h1>
      <SearchBar onSelect={handleSelectLocation} />
    </main>
  );
};