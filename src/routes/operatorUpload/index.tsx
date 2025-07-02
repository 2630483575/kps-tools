import Sidebar from "@/components/layout/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/operatorUpload/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex overflow-hidden">
      <Sidebar />
    </div>
  );
}
