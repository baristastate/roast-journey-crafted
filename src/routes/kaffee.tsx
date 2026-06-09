import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/kaffee")({
  beforeLoad: () => {
    throw redirect({ to: "/shop" });
  },
});
