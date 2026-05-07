import { useState, type ChangeEvent } from "react";
import { useItemStore } from "../store/itemStore";

export default function PackingCategory({ category, items }: PackingCategory) {
  const [showAddItem, setShowAddItem] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const addItem = useItemStore((state) => state.addItemManually);
  const markPacked = useItemStore((state) => state.markPacked);

  const handleAddItemName = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!(e.target.value.length > 0)) {
      return;
    }
    setItemName(e.target.value);
  };

  const handleSetQuantity = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!(Number(e.target.value) > 0)) {
      return;
    }
    setQuantity(e.target.value);
  };

  return (
    <div className="flex max-h-96 overflow-y-auto flex-col gap-6 p-8 rounded-lg scroll-smooth bg-zinc-900/40 border border-zinc-800/50">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/50">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          {category}
        </h3>
        <span className="text-[10px] font-bold text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">
          {items.length} items
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <label
            key={item.name}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                onChange={() => markPacked(item, category)}
                className="peer h-5 w-5 appearance-none rounded-lg border border-zinc-800 bg-zinc-900 checked:bg-white checked:border-white transition-all cursor-pointer"
              />
              <svg
                className="absolute h-3 w-3 text-black opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="w-full flex flex-col gap-1">
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors text-md font-bold">
                {item.name}
              </span>
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors text-xs font-medium">
                {item.reason ? item.reason : ""}
              </span>
            </div>
          </label>
        ))}
      </div>

      {!showAddItem && (
        <button
          onClick={() => setShowAddItem(true)}
          className="w-full py-3 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:border-zinc-700 hover:text-zinc-400 hover:bg-zinc-800/50 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add More
        </button>
      )}
      {showAddItem && (
        <div className="flex w-full justify-between gap-4">
          <input
            type="text"
            onChange={handleAddItemName}
            value={itemName}
            placeholder="Item name"
            className="w-full px-2 py-2 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-zinc-700 focus:ring-4 focus:ring-white/5 transition-all text-xl placeholder:text-zinc-700 text-white"
          />
          <input
            type="string"
            onChange={handleSetQuantity}
            value={quantity}
            placeholder="Qauntity"
            className="w-full px-2 py-2 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-zinc-700 focus:ring-4 focus:ring-white/5 transition-all text-xl placeholder:text-zinc-700 text-white"
          />
          <button
            onClick={() => {
              addItem({ name: itemName, quantity }, category);
              setQuantity("");
              setItemName("");
              setShowAddItem(false);
            }}
            className="w-fit py-1 px-4 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:border-zinc-700 hover:text-zinc-400 hover:bg-zinc-800/50 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
