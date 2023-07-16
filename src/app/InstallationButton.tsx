"use client";

import { useCallback, useEffect, useState } from "react";

import { Button, type ButtonProps } from "@mui/material";
import { InstallMobile } from "@mui/icons-material";

interface Props {
  message?: string;
  disabledMessage?: string;
  props?: ButtonProps;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallationButton = ({
  message = "ホームに追加",
  disabledMessage = "ホームに追加済み",
  props = {},
}: Props) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const isInstallable = deferredPrompt !== null;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    });
  }, []);

  const onInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  return (
    <Button
      onClick={() => void onInstallClick()}
      startIcon={<InstallMobile />}
      disabled={!isInstallable}
      {...props}
    >
      {isInstallable ? message : disabledMessage}
    </Button>
  );
};

export default InstallationButton;
