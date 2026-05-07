import { useEffect } from "react";
import ListPackingItems from "../components/ListPackingItems";
import Search from "../components/Search";
import { useAi } from "../hooks/useAi";
import { useWeather } from "../hooks/useWeather";
import { useItemStore } from "../store/itemStore";

export default function Planner() {
  const { weatherData } = useWeather();
  const { response, isLoading } = useAi(weatherData?.["daily"]);

  const addItems = useItemStore((state) => state.addItems);

  useEffect(() => {
    if (response !== undefined && response !== null)
      addItems(response?.["packing_categories"]);
  }, [response, addItems]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Plan your <span className="text-zinc-600">journey.</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-xl">
          Enter your destination below to generate a tailored packing list and
          itinerary.
        </p>
      </div>

      <div className="w-full">
        <Search />
      </div>
      <ListPackingItems isLoading={isLoading} />
    </div>
  );
}
