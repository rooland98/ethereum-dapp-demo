import { createRoute } from "@tanstack/react-router";
import Home from "../modules/Home";
import { Redirect } from "../ui/components/Redirect";
import { rootRoute } from "./_root";
import { BASE_PATH } from "../utils/constants";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  notFoundComponent: Redirect,
  path: BASE_PATH,
  component: () => <Home />,
});
