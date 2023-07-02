"use client";

import { api } from "~/utils/api";

export function AuthShowcase() {
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    // { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
    </div>
  );
}
