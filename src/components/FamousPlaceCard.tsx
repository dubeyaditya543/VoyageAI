import { useImage } from "../hooks/useImage";

export type Place = {
  id: number;
  name: string;
  description: string;
  rating: number;
  about_place_link: string;
};

type CardProps = {
  place: Place;
};

export const FamousPlaceCard = ({ place }: CardProps) => {
  const { data: imageUrl } = useImage(place.name);
  return (
    <article className="group flex flex-col h-48 sm:flex-row rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 shadow-lg hover:shadow-xl">
      {/* Image Container */}
      <div className="w-full sm:w-48 md:w-64 shrink-0 aspect-video sm:aspect-square md:aspect-video overflow-hidden relative">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent sm:hidden" />
      </div>

      {/* Details Container */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white transition-colors">
              {place.name}
            </h3>
            <div className="flex items-center gap-1 text-amber-400 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 ${i < Math.round(place.rating) ? "fill-current text-amber-400" : "fill-none text-zinc-600"}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L17.82 22 12 18.5 6.18 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-sm font-semibold text-zinc-400 ml-1">
                ({place.rating.toFixed(1)})
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 font-semibold leading-relaxed line-clamp-3 sm:line-clamp-2 md:line-clamp-3">
            {place.description}
          </p>
        </div>

        <div className="flex items-center justify-end sm:justify-start">
          <a
            href={place.about_place_link}
            target="_blank"
            className="inline-flex group items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-md hover:shadow-blue-500/20 transition-all duration-200"
            rel="noopener noreferrer"
          >
            Explore Place
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

