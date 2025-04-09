import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../ui/layouts/RootLayout";
import { homeRoute } from "./Home";

export const rootRoute = createRootRoute({
  component: () => <RootLayout />,
});

export const routeTree = rootRoute.addChildren([homeRoute]);
