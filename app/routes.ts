import { index, layout, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/title-bar.tsx", [
    layout("layouts/layout.tsx", [index("routes/home.tsx")]),
  ]),
] satisfies RouteConfig;
