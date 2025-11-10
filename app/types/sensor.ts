// Type definitions for sensor data
export interface SensorRecord {
  idx: number;
  suhu: number;
  humid: number;
  kecerahan: number;
  timestamp: string;
}

export interface MonthYear {
  month_year: string;
}

export interface SensorData {
  suhumax: number;
  suhumin: number;
  suhurata: number;
  humidmax: number;
  nilai_suhu_max_humid_max: SensorRecord[];
  month_year_max: MonthYear[];
}
