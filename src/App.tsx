import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Index";

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
