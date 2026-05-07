import { useCities } from "../hooks/useCities";
import { useCityStore } from "../store/cityStore";
import { useItemStore } from "../store/itemStore";

export default function ListCities({ cityName, setName }: { cityName: string, setName: (value: string) => void}) {
  const { cities, isLoading } = useCities(cityName);
  const setCity = useCityStore((state) => state.setCity);
  const clearItems = useItemStore((state) => state.clearItems)

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center bg-zinc-900 border border-zinc-800 rounded-2xl">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cities) return null;

  return (
    <div className="flex flex-col gap-1 max-h-72 overflow-y-auto z-50 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 shadow-2xl">
      {cities.length > 0 ? (
        cities.map((city) => (
          <div
            className="group px-4 py-3 hover:bg-zinc-800 transition-all flex w-full justify-between items-center rounded-xl cursor-pointer"
            key={city.id}
            onClick={() => {setCity(city); setName(""); clearItems()}}
          >
            <div className="space-y-0.5">
              <p className="font-semibold text-white group-hover:text-blue-500 transition-colors">{city.name}</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{city.country}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-zinc-600 text-sm italic">No destinations found</div>
      )}
    </div>
  );
}
