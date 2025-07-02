import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dataDownload/$id/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
