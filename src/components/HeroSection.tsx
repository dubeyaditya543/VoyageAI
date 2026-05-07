import { useNavigate } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import CardInfo from "./InfoCard";
import ListFeatures from "./ListFeatures";

export default function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-6 py-20 gap-32">
      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-medium text-zinc-400">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          AI-Powered Travel Intelligence
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          The intelligence behind <span className="text-zinc-500">every great journey.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Predictive packing lists and smart itineraries generated for your specific destination, climate, and travel style.
        </p>
        
        <div className="flex items-center gap-4 pt-4">
          <button onClick={() => navigate("/signup")} className="btn-primary cursor-pointer px-8 py-3 text-base h-12 flex items-center">
            Start Planning
          </button>
          <button onClick={() => navigate("/login")} className="btn-secondary cursor-pointer px-8 py-3 text-base h-12 flex items-center">
            View Demo
          </button>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <div className="flex flex-col items-center gap-8 py-12 border-y border-zinc-900/50">
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Trusted by modern explorers</p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40 grayscale">
          {/* Logo Placeholders - Using font weights for logo-like feel */}
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">AIRBNB</span>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">EXPEDIA</span>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">KAYAK</span>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">TRIP.COM</span>
        </div>
      </div>

      {/* Destinations Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Popular Destinations</h2>
            <p className="text-zinc-500 text-lg">Curated lists for trending global cities.</p>
          </div>
          <button className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1">
            Browse all <span>→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DestinationCard countryFlag="🇯🇵" cityName="Tokyo" temperatureStyle="Temperate" />
          <DestinationCard countryFlag="🇮🇩" cityName="Bali" temperatureStyle="Tropical" />
          <DestinationCard countryFlag="🇫🇷" cityName="Paris" temperatureStyle="Mild" />
          <DestinationCard countryFlag="🇿🇦" cityName="Cape Town" temperatureStyle="Sunny" />
        </div>
      </section>

      {/* Features */}
      <section className="space-y-20 py-20">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-white">Engineered for travel.</h2>
          <p className="text-zinc-500 text-lg">Every feature is designed to reduce friction and help you focus on the experience, not the logistics.</p>
        </div>
        <ListFeatures />
      </section>

      {/* Info Card / Final CTA */}
      <CardInfo />
    </div>
  );
}
