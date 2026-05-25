import { useQuery } from "@tanstack/react-query";

export const useImage = (placeName: string) => {
  const { data } = useQuery<string>({
    queryKey: ["image", placeName],
    queryFn: async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${placeName}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}&orientation=landscape`,
      );
      const data = await response.json();
      console.log(data)
      return data?.["results"][0]["urls"]["regular"];
    },
    enabled: placeName !== null && placeName !== undefined,
  });

  return {data};
};
