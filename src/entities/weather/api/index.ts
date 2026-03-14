import apiClient from '@/shared/api/client';
import type { Coordinates, CurrentWeather, DailyForecast, AirQuality, AqiLevel } from '../model/types';

// 3-2: 장소명 → 위도/경도
export const fetchCoordinates = async (fullName: string): Promise<Coordinates> => {
  const { data } = await apiClient.get('/geo/1.0/direct', {
    params: { q: `${fullName},KR`, limit: 1 },
  });

  if (!data || data.length === 0) {
    throw new Error('해당 장소의 정보가 제공되지 않습니다.');
  }

  return { lat: data[0].lat, lon: data[0].lon };
};

// 3-4: 5일 예보 → 당일 최저/최고/시간별 가공
export const fetchDailyForecast = async ({ lat, lon }: Coordinates): Promise<DailyForecast> => {
  const { data } = await apiClient.get('/data/2.5/forecast', {
    params: { lat, lon, units: 'metric', lang: 'kr' },
  });

  const today = new Date().toISOString().slice(0, 10); // "2024-01-01"

  // dt_txt 앞 10자리가 오늘 날짜인 항목만 추출
  const todayList = data.list.filter((item: { dt_txt: string }) =>
    item.dt_txt.startsWith(today)
  );

  const temps = todayList.map((item: { main: { temp: number } }) => Math.round(item.main.temp));

  const hourly = todayList.map((item: { dt_txt: string; main: { temp: number }; weather: { icon: string }[] }) => ({
    time: item.dt_txt.slice(11, 16), // "12:00:00" → "12:00"
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
  }));

  return {
    tempMin: Math.min(...temps),
    tempMax: Math.max(...temps),
    hourly,
  };
};

// 3-3: 현재 날씨
export const fetchCurrentWeather = async ({ lat, lon }: Coordinates): Promise<CurrentWeather> => {
  const { data } = await apiClient.get('/data/2.5/weather', {
    params: { lat, lon, units: 'metric', lang: 'kr' },
  });

  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
};

// 3-5: 미세먼지
export const fetchAirQuality = async ({ lat, lon }: Coordinates): Promise<AirQuality> => {
  const { data } = await apiClient.get('/data/2.5/air_pollution', {
    params: { lat, lon },
  });

  const { aqi } = data.list[0].main;
  const { pm2_5, pm10 } = data.list[0].components;

  return {
    aqi: aqi as AqiLevel,
    pm2_5: Math.round(pm2_5 * 10) / 10, // 소수점 1자리
    pm10: Math.round(pm10 * 10) / 10,
  };
};