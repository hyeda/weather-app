import { useQuery } from '@tanstack/react-query';
import { fetchCoordinates, fetchCurrentWeather, fetchDailyForecast, fetchAirQuality } from '../api';
import type { Coordinates } from '../model/types';

export const useCoordinates = (fullName: string) =>
  useQuery({
    queryKey: ['coordinates', fullName],
    queryFn: () => fetchCoordinates(fullName),
    enabled: !!fullName,
  });

export const useCurrentWeather = (coords: Coordinates | undefined) =>
  useQuery({
    queryKey: ['weather', coords],
    queryFn: () => fetchCurrentWeather(coords!),
    enabled: !!coords,
  });

export const useForecast = (coords: Coordinates | undefined) =>
  useQuery({
    queryKey: ['forecast', coords],
    queryFn: () => fetchDailyForecast(coords!),
    enabled: !!coords,
  });

export const useAirQuality = (coords: Coordinates | undefined) =>
  useQuery({
    queryKey: ['airQuality', coords],
    queryFn: () => fetchAirQuality(coords!),
    enabled: !!coords,
  });