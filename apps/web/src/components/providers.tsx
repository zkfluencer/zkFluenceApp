"use client";

import { MiniAppProvider } from "@/contexts/miniapp-context";
import FrameWalletProvider from "@/contexts/frame-wallet-context";
import { SelfProvider } from "@/contexts/SelfContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FrameWalletProvider>
      <MiniAppProvider addMiniAppOnLoad={true}>
        <SelfProvider>
          {children}
        </SelfProvider>
      </MiniAppProvider>
    </FrameWalletProvider>
  );
}
