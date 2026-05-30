import { useEffect, useRef } from "react";
import ListPackingItems from "../components/ListPackingItems";
import Search from "../components/Search";
import { useWeather } from "../hooks/useWeather";
import { useItemStore } from "../store/itemStore";
import { useModeStore } from "../store/modeStore";
import ListPlaces from "../components/ListPlaces";
import { usePlaces } from "../hooks/usePlaces";
import { useCityStore } from "../store/cityStore";
// import { useTestAi } from "../hooks/useTestAi";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAi } from "../hooks/useAi";

export default function Planner() {
  const city = useCityStore((state) => state.currentCity);
  const { weatherData } = useWeather();
  const {response: data, isLoading} = useAi(weatherData?.["daily"])
  const { places, isLoading: placesLoading } = usePlaces(city);

  const lastSubmittedDataRef = useRef<typeof data | null>(null)

  const tripInfo = useQuery(api.packingItems.getTripInfo)
  
  const addBulk = useMutation(api.packingItems.addBulk)
  const response = useQuery(api.packingItems.list, tripInfo ? {tripId: tripInfo._id} : "skip")

  const addItems = useItemStore((state) => state.addItems);
  const mode = useModeStore((state) => state.mode);
  const changeMode = useModeStore((state) => state.changeMode);

  useEffect(() => {
    if(response !== undefined){
      addItems(response)
    }
  }, [response, addItems])

  useEffect(() => {
    if(!isLoading && data && data.length > 0 && data !== lastSubmittedDataRef.current && tripInfo){
      addBulk({ bulkItems: data, tripId: tripInfo._id })
      lastSubmittedDataRef.current = data
    }
  }, [data, isLoading, addBulk, tripInfo, tripInfo?._id])

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-15">
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

      <div className="flex w-full gap-2 items-center font-bold">
        <button
          onClick={() => changeMode("planner")}
          className={`hover:bg-zinc-800/80 duration-300 transition-all px-4 py-2 rounded-md hover:cursor-pointer ${mode === "planner" ? "bg-zinc-800/80" : ""}`}
        >
          Planner
        </button>
        <button
          onClick={() => changeMode("places")}
          className={`hover:bg-zinc-800/80 duration-300 transition-all px-4 py-2 rounded-md hover:cursor-pointer ${mode === "places" ? "bg-zinc-800/80" : ""}`}
        >
          Famous Places
        </button>
      </div>

      {mode === "planner" ? (
        <ListPackingItems isLoading={isLoading} />
      ) : (
        <ListPlaces places={places ? places : []} isLoading={placesLoading} />
      )}
    </div>
  );
}
