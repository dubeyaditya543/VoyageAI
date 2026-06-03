import { useQuery } from "@tanstack/react-query";
import { useCityStore } from "../store/cityStore";

export const useImage = (placeName: string) => {
  const currentCity = useCityStore((state) => state.currentCity)
  const { data, isPending } = useQuery<string>({
    queryKey: ["image", placeName],
    queryFn: async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${placeName}-${currentCity?.country}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}&orientation=landscape`,
      );
      const data = await response.json();
      // console.log(data)
      return data?.["results"]?.[0]?.["urls"]?.["regular"] ?? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original";
    },
    enabled: placeName !== null && placeName !== undefined && currentCity?.name !== placeName
  });

  return {data, isPending};
};
