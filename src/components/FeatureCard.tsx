import type { ReactNode } from "react"

type FeatureCard = {
  emoji: string,
  children: ReactNode
}

export default function FeatureCard({emoji, children}: FeatureCard){
  return (
    <div className="flex flex-col gap-6 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all group">
      <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-2xl text-2xl group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
        {emoji}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}