import { useCityStore } from "../store/cityStore";
import { useItemStore } from "../store/itemStore";
import { useUtilStore } from "../store/utilStore";
import PackingCategory from "./PackingCategoryCard";

type Category = "clothing" | "electronics" | "toiletries" | "miscellaneous";

export default function ListPackingItems({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const items = useItemStore((state) => state.items);
  const city = useCityStore((state) => state.currentCity);
  const handleFocus = useUtilStore((state) => state.handleFocus);

  const clothingList = items?.filter(
    (packingItem) => packingItem.category === "clothing",
  );
  const electronicsList = items?.filter(
    (packingItem) => packingItem.category === "electronics",
  );
  const toiletriesList = items?.filter(
    (packingItem) => packingItem.category === "toiletries",
  );
  const miscellaneousList = items?.filter(
    (packingItem) => packingItem.category === "miscellaneous",
  );

  const generatedList = [
    { category: "clothing", items: clothingList },
    { category: "electronics", items: electronicsList },
    { category: "toiletries", items: toiletriesList },
    { category: "miscellaneous", items: miscellaneousList },
  ];

  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {city ? (
              <div>
                Your Packing List for{" "}
                <span
                  onClick={handleFocus}
                  className="hover:cursor-pointer underline"
                >
                  {city?.name}
                </span>
              </div>
            ) : (
              <div>Choose a city to show essentials</div>
            )}
          </h2>
          <p className="text-zinc-500">
            AI-generated essentials for your upcoming trip.
          </p>
        </div>
        {items.length > 0 ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Ready to pack
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
            No items
          </div>
        )}
      </div>

      {isLoading && (
        <div className="p-12 flex justify-center bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
        </div>
      )}

      {!items.length && !isLoading ? (
        <div className="text-center font-semibold">Nothing to show here...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {generatedList.map((item) => (
            <PackingCategory
              key={item.category}
              category={item?.category as Category}
              items={item?.items}
            />
          ))}
        </div>
      )}
    </div>
  );
}
