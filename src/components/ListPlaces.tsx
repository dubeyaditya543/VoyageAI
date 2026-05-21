import { useCityStore } from "../store/cityStore";
import { FamousPlaceCard, type Place } from "./FamousPlaceCard";

export default function ListPlaces({
  places,
  isLoading,
}: {
  places: Place[];
  isLoading: boolean;
}) {
  const city = useCityStore((state) => state.currentCity);

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {city ? `Must visit places in ${city.name}` : "Choose a city first"}
        </h2>
        <p className="text-zinc-500">Famous places to visit.</p>
      </div>

      {isLoading && (
        <div className="p-12 flex justify-center bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {places?.map((place) => {
          return <FamousPlaceCard key={place.id} place={place} />
        })}
      </div>
    </section>
  );
}
