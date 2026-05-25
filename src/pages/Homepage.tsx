import { useConvexAuth } from "@convex-dev/auth/react"
import HeroSection from "../components/HeroSection"
import { useNavigate } from "react-router-dom"

export default function Homepage() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const navigate = useNavigate()
  if (isLoading) {
    return <h1 className="text-2xl text-center">Loading...</h1>
  }
  if (isAuthenticated) {
    navigate("/planner")
  }
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
    </div>
  )
}