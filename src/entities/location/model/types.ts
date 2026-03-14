export type LocationLevel = '시' | '구' | '동';

export interface Location {
  id: string;       // 원본 문자열 그대로 ("서울특별시-종로구-청운동")
  name: string;     // 마지막 행정구역명 ("청운동")
  fullName: string; // 공백 구분 전체 이름 ("서울특별시 종로구 청운동")
  level: LocationLevel;
}