import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dataUpload/_layout/")({
  component: undefined,
  beforeLoad: async () => {
    redirect({
      to: "/dataUpload/minio",
      throw: true,
    });
  },
});
