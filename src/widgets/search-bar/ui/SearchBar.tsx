import { useState, useEffect, useMemo } from 'react';
import { parseDistricts } from '@/entities/location/lib/parse';
import { searchLocations } from '@/entities/location/lib/search';
import type { Location } from '@/entities/location/model/types';

interface SearchBarProps {
  onSelect: (location: Location) => void;
}

export const SearchBar = ({ onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [allLocations, setAllLocations] = useState<Location[]>([]);

  // 앱 최초 렌더링 시 korea_districts.json을 한 번만 fetch해서 파싱
  useEffect(() => {
    fetch('/korea_districts.json')
      .then((res) => res.json())
      .then((raw: string[]) => setAllLocations(parseDistricts(raw)));
  }, []);

  // query/allLocations에서 바로 계산
  const results = useMemo(
    () => searchLocations(allLocations, query),
    [allLocations, query]
  );

  const handleSelect = (location: Location) => {
    setQuery('');
    onSelect(location);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="지역 검색 (예: 종로구, 청운동)"
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
      />
      {query.trim() !== '' && (
        <ul className="absolute top-full mt-1 w-full bg-slate-800 border border-white/20 rounded-lg overflow-hidden z-10">
          {results.length > 0 ? (
            results.map((location) => (
              <li
                key={location.id}
                onClick={() => handleSelect(location)}
                className="px-4 py-2 cursor-pointer text-sm flex justify-between items-center text-white/80 hover:bg-white/10"
              >
                <span>{location.name}</span>
                <span className="text-white/40 text-xs">{location.fullName}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-white/50 text-sm">
              해당 장소의 정보가 제공되지 않습니다.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};