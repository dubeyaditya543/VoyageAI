import { useEffect, useRef, useState } from "react";
import ListPackingItems from "../components/ListPackingItems";
import Search from "../components/Search";
import { useWeather } from "../hooks/useWeather";
import { useItemStore } from "../store/itemStore";
import { useModeStore } from "../store/modeStore";
import ListPlaces from "../components/ListPlaces";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useFamousPlaceStore } from "../store/famousPlaceStore";

export default function Planner() {
  const [data, setData] = useState<[] | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [placesLoading, setPlacesLoading] = useState(false);

  const tripInfo = useQuery(api.packingItems.getTripInfo);

  const { weatherData, isLoading: weatherLoading } = useWeather();

  const fetchFamousPlaces = useAction(api.ai.useAiToFetchFamousPlaces);
  const clearPlaces = useFamousPlaceStore((state) => state.clearPlaces)

  const lastSubmittedDataRef = useRef<typeof data | null>(null);

  const fetchPackingList = useAction(api.ai.useAiToFetchPackingList);

  const addBulk = useMutation(api.packingItems.addBulk);
  const response = useQuery(
    api.packingItems.list,
    tripInfo ? { tripId: tripInfo._id } : "skip",
  );

  const addItems = useItemStore((state) => state.addItems);
  const mode = useModeStore((state) => state.mode);
  const changeMode = useModeStore((state) => state.changeMode);
  const famousPlaces = useFamousPlaceStore((state) => state.places);
  const addPlaces = useFamousPlaceStore((state) => state.addPlaces);

  useEffect(() => {
    if (!weatherData?.["daily"]) return;
    if (response === undefined) return;
    if (response.length > 0) return;
    const callFunc = async () => {
      setAiLoading(true);
      try {
        const data = await fetchPackingList({ daily: weatherData["daily"] });
        setData(data);
      } catch (error) {
        console.error("something went wrong", error);
      } finally {
        setAiLoading(false);
      }
    };
    callFunc();
  }, [weatherData, fetchPackingList, response]);

  useEffect(() => {
    if (!tripInfo?.aboutCity) return;
    const callFunc = async () => {
      clearPlaces()
      setPlacesLoading(true);
      try {
        const data = await fetchFamousPlaces({ city: tripInfo?.aboutCity });
        addPlaces(data);
      } catch (error) {
        console.error("something went wrong", error);
      } finally {
        setPlacesLoading(false);
      }
    };
    callFunc();
  }, [fetchFamousPlaces, tripInfo, addPlaces, clearPlaces]);

  useEffect(() => {
    if (response !== undefined) {
      addItems(response);
    }
  }, [response, addItems]);

  useEffect(() => {
    const callFunc = async () => {
      if (
        !aiLoading &&
        data &&
        data.length > 0 &&
        data !== lastSubmittedDataRef.current &&
        tripInfo
      ) {
        try {
          await addBulk({ bulkItems: data, tripId: tripInfo._id });
          lastSubmittedDataRef.current = data;
        } catch (error) {
          console.error(error);
        }
      }
    };
    callFunc();
  }, [data, aiLoading, addBulk, tripInfo, tripInfo?._id]);

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
        <ListPackingItems isLoading={aiLoading || weatherLoading} />
      ) : (
        <ListPlaces
          places={famousPlaces ? famousPlaces : []}
          isLoading={placesLoading}
        />
      )}
    </div>
  );
}
