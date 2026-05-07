import { useEffect, useRef, useState } from "react";
import ListCities from "./ListCities";
import { useUtilStore } from "../store/utilStore";

export default function Search() {
  const [name, setName] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null)
  const searchFocus = useUtilStore((state) => state.searchFocus)

  useEffect(() => {
    if(ref !== undefined)
    ref?.current?.focus()
  }, [searchFocus])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          ref={ref}
          value={name}
          type="text"
          placeholder="Where are you going? (e.g. Tokyo, Bali, Paris)"
          className="w-full pl-14 pr-24 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none focus:border-zinc-700 focus:ring-4 focus:ring-white/5 transition-all text-xl placeholder:text-zinc-700 text-white md:placeholder:text-md placeholder:text-sm "
        />
        {name.length > 0 && (
          <button 
            onClick={() => setName("")} 
            className="absolute right-5 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors bg-zinc-800 rounded-lg"
          >
            Clear
          </button>
        )}
      </div>
      {name.length > 0 && <ListCities cityName={name} setName={setName} />}
    </div>
  );
}
