type DestinationCardProps = {
  countryFlag: string,
  cityName: string,
  temperatureStyle: string
}

export default function DestinationCard({countryFlag, cityName, temperatureStyle}: DestinationCardProps){
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 w-44 hover:scale-105 transition-all cursor-pointer border border-white/5 hover:border-blue-500/20">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-4xl shadow-inner">
        {countryFlag}
      </div>
      <div className="text-center">
        <p className="font-bold text-white text-lg">{cityName}</p>
        <p className="text-xs text-blue-400 font-medium uppercase tracking-widest">{temperatureStyle}</p>
      </div>
    </div>
  )
}