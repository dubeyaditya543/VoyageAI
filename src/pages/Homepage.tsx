import { useConvexAuth } from "@convex-dev/auth/react";
import HeroSection from "../components/HeroSection";

export default function Homepage() {
  const { isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="p-12 h-dvh flex justify-center items-center rounded-2xl">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
    </div>
  );
}
