"use client";

import { api } from "~/utils/api";

export default function ClientHome() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <p className="text-2xl text-white">
      {hello.data ? hello.data.greeting : "Loading tRPC query..."}
    </p>
  );
}
