"use client";

import React, { useEffect, useState } from "react";

interface Props {
  message?: string;
  disabledMessage?: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallationButton = ({
  message = "ホーム画面に追加",
  disabledMessage = "ホーム画面に追加済み",
}: Props) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    });
  }, []);

  const onInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      setIsInstallable(true);
    }
  };

  return (
    <button
      onClick={() => void onInstallClick()}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      disabled={!isInstallable}
    >
      {isInstallable ? message : disabledMessage}
    </button>
  );
};

export default InstallationButton;
