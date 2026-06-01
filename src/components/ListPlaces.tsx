import { useQuery } from "convex/react";
import { FamousPlaceCard, type Place } from "./FamousPlaceCard";
import { api } from "../../convex/_generated/api";

export default function ListPlaces({
  places,
  isLoading,
}: {
  places: Place[];
  isLoading: boolean;
}) {
  const tripInfo = useQuery(api.packingItems.getTripInfo);

  return (
    <section className="space-y-8">
      <div className="flex w-full justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {tripInfo
              ? `Must visit places in ${tripInfo?.aboutCity.name}`
              : "Choose a city to show famous places"}
          </h2>
          <p className="text-zinc-500">Famous places to visit.</p>
        </div>

        <div>
          {places.length > 0 ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Ready to travel
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
              No place
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="p-12 flex justify-center bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {places.length > 0 && places?.map((place) => {
          return <FamousPlaceCard key={place.id} place={place} />;
        })}
      </div>
    </section>
  );
}
