import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes/_root";
import "../index.css";
import { Toaster } from "sonner";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
