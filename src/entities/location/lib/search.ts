import type { Location } from '../model/types';

const MAX_RESULTS = 10;

export const searchLocations = (locations: Location[], query: string): Location[] => {
  const trimmed = query.trim();
  if (trimmed === '') return [];

  return locations
    .filter(({ name, fullName }) =>
      name.includes(trimmed) || fullName.includes(trimmed)
    )
    .slice(0, MAX_RESULTS);
};