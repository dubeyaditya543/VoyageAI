import { useQuery } from "@tanstack/react-query";

export const useCities = (city: string) => {
  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities", city],
    enabled: city !== undefined && city !== null,
    queryFn: async () => {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
      );
      const data = await response.json();
      return data["results"] as CitiesFetched;
    },
  });

  return { cities, isLoading, error };
};
