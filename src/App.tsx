import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Index";
import { useWeather } from "./hooks/useWeather";
import { useTestAi } from "./hooks/useTestAi";

export default function App() {
  const { weatherData } = useWeather();
  const { data } = useTestAi(weatherData?.["daily"]);
  console.log(data);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
