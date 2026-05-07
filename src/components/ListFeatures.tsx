import FeatureCard from "./FeatureCard";

export default function ListFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      <FeatureCard emoji="🌤️">
        <h4 className="font-bold text-white text-lg">Climate-aware intelligence</h4>
        <p className="text-zinc-500 leading-relaxed">Sophisticated packing suggestions tailored to real-time weather data and destination micro-climates.</p>
      </FeatureCard>

      <FeatureCard emoji="📋">
        <h4 className="font-bold text-white text-lg">Structured logistics</h4>
        <p className="text-zinc-500 leading-relaxed">Clothing, electronics, toiletries, and essential documents — perfectly sorted for frictionless transit.</p>
      </FeatureCard>

      <FeatureCard emoji="✈️">
        <h4 className="font-bold text-white text-lg">Dynamic itineraries</h4>
        <p className="text-zinc-500 leading-relaxed">Generate comprehensive day-by-day plans based on your unique travel style and trip duration.</p>
      </FeatureCard>
    </div>
  );
}
