import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const user: User | null = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout)

  const handleOnClick = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-100 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105">
            V
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Voyage<span className="text-zinc-500 font-medium">AI</span>
          </span>
        </div>
        
        {user ? <div className="flex gap-4 items-center">
          <span className="font-bold uppercase">{user.name}</span>
          <button onClick={() => handleOnClick()} className="btn-secondary text-sm shadow-none hover:cursor-pointer">Logout</button>
        </div> : <nav className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn-primary text-sm shadow-none hover:cursor-pointer"
          >
            Get Started
          </button>
        </nav>}
      </div>
    </header>
  );
}
