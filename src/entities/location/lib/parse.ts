import type { Location, LocationLevel } from '../model/types';

const LEVEL_MAP: Record<number, LocationLevel> = {
  1: '시',
  2: '구',
  3: '동',
};

export const parseDistricts = (raw: string[]): Location[] =>
  raw.map((entry) => {
    const parts = entry.split('-');
    const level = LEVEL_MAP[parts.length];
    return {
      id: entry,
      name: parts[parts.length - 1],
      fullName: parts.join(' '),
      level,
    };
  });