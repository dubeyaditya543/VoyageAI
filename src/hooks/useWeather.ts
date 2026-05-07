import { useQuery } from "@tanstack/react-query";
import { useCityStore } from "../store/cityStore";

export const useWeather = () => {
  const latitude: number | undefined = useCityStore(
    (state) => state.currentCity?.latitude,
  );
  const longitude: number | undefined = useCityStore(
    (state) => state.currentCity?.longitude,
  );

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weather", latitude, longitude],
    enabled: latitude !== undefined && longitude !== undefined,
    queryFn: async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum&timezone=auto`,
      );
      return await response.json();
    },
  });

  return { weatherData, isLoading, error };
};
