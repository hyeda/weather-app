// Geocoding API 응답
export interface Coordinates {
  lat: number;
  lon: number;
}

// Current Weather API 응답 (필요한 필드만)
export interface CurrentWeather {
  temp: number;        // 현재 기온 (°C)
  feelsLike: number;  // 체감 온도 (°C)
  description: string; // 날씨 설명 ("맑음", "흐림" 등)
  icon: string;        // 날씨 아이콘 코드 ("01d", "02n" 등)
  humidity: number;    // 습도 (%)
  windSpeed: number;   // 풍속 (m/s)
}

// Forecast API — 시간대별 기온 단위
export interface HourlyForecast {
  time: string;   // "14:00" 형태
  temp: number;
  icon: string;
}

// Forecast API 가공 결과
export interface DailyForecast {
  tempMin: number;
  tempMax: number;
  hourly: HourlyForecast[];
}

// Air Pollution API 응답
export type AqiLevel = 1 | 2 | 3 | 4 | 5;

export interface AirQuality {
  aqi: AqiLevel;   // 1(좋음) ~ 5(매우나쁨)
  pm2_5: number;   // PM2.5 (μg/m³)
  pm10: number;    // PM10 (μg/m³)
}

// AQI 등급 → 한글 레이블 매핑
export const AQI_LABEL: Record<AqiLevel, string> = {
  1: '좋음',
  2: '보통',
  3: '나쁨',
  4: '매우나쁨',
  5: '위험',
};

// AQI 등급 → Tailwind 색상 클래스
export const AQI_COLOR: Record<AqiLevel, string> = {
  1: 'text-blue-400',
  2: 'text-green-400',
  3: 'text-yellow-400',
  4: 'text-orange-400',
  5: 'text-red-400',
};