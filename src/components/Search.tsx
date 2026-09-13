import { useEffect, useRef, useState } from "react";
import ListCities from "./ListCities";
import { useUtilStore } from "../store/utilStore";
import { useDebounce } from "../hooks/useDebounce";
import { useItemStore } from "../store/itemStore";
import { useGenderStore } from "../store/genderStore.ts";

export default function Search() {
  const [name, setName] = useState<string>("");
  const debouncedSearch = useDebounce(name);
  const ref = useRef<HTMLInputElement | null>(null);
  const searchFocus = useUtilStore((state) => state.searchFocus);
  const setGender = useGenderStore((state) => state.setGender);
  const gender = useGenderStore((state) => state.gender);
  const menstruationStatus = useGenderStore((state) => state.menstruationStatus);
  const setMenstruationStatus = useGenderStore((state) => state.setMenstruationStatus);

  const loading = useItemStore((state) => state.loading);

  useEffect(() => {
    if (ref.current !== null) ref?.current?.focus();
  }, [searchFocus]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-3 items-center">
        <div className="relative group flex-1">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setName(e.target.value)}
            ref={ref}
            value={name}
            type="text"
            placeholder="Where are you going? (e.g. Tokyo, Bali, Paris)"
            className="w-full pl-14 pr-24 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none focus:border-zinc-700 transition-all text-lg placeholder:text-zinc-700 text-white md:placeholder:text-md placeholder:text-sm "
            disabled={loading}
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

        <div className="relative group md:w-40">
          <select
            value={gender === undefined ? "any" : gender}
            onChange={(e) =>
              setGender(e.target.value === "any" ? undefined : e.target.value)
            }
            className="w-full px-2 py-2 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-zinc-700 transition-all text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {gender === "female" && (
          <div className="relative group md:w-40">
            <select
              value={menstruationStatus ? "yes" : "no"}
              onChange={(e) => setMenstruationStatus(e.target.value === "yes")}
              className="w-full px-2 py-2 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-zinc-700 transition-all text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <option value="no">Not on Period</option>
              <option value="yes">On Period</option>
            </select>
          </div>
        )}
      </div>
      {name.length > 0 && (
        <ListCities cityName={debouncedSearch} setName={setName} />
      )}
    </div>
  );
}
