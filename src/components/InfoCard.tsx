import { useConvexAuth } from "convex/react";
import { useNavigate } from "react-router-dom";

export default function CardInfo() {
  const navigate = useNavigate();

  const { isAuthenticated } = useConvexAuth();

  return (
    <section className="w-full py-24 px-6 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Elevate your travel experience.
          </h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Join a new generation of explorers who value efficiency and
            precision. Create your account to start building your professional
            travel profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isAuthenticated ? (
            <button className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 transition-colors duration-300 font-semibold px-4 py-2 rounded-md">Go to my planner</button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="btn-primary px-10 py-4 text-lg w-full sm:w-auto shadow-none"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn-secondary px-10 py-4 text-lg w-full sm:w-auto"
              >
                Sign In to Account
              </button>
            </>
          )}
        </div>

        <p className="text-zinc-600 text-xs font-medium uppercase tracking-[0.2em]">
          No credit card required • Instant AI generation
        </p>
      </div>
    </section>
  );
}
