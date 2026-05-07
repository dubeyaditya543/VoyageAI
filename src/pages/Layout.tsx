import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout(){
  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-blue-500/30 selection:text-blue-200">
      <Header />
      <main className="pt-16 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-5 h-5 bg-white text-black rounded flex items-center justify-center font-black text-[10px]">V</div>
            <span className="text-sm font-bold tracking-tight">VoyageAI</span>
          </div>
          <p className="text-zinc-600 text-xs">
            © 2026 Voyage AI. Built for the modern traveler.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors text-xs">Terms</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors text-xs">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}