"use client";
import { sdk } from "@farcaster/frame-sdk";
// Use any types for Farcaster SDK compatibility
type FrameContext = any;
type AddFrameResult = any;
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import FrameWalletProvider from "./frame-wallet-context";

interface MiniAppContextType {
  isMiniAppReady: boolean;
  isSDKLoaded: boolean;
  context: FrameContext | null;
  setMiniAppReady: () => void;
  addMiniApp: () => Promise<AddFrameResult | null>;
}

const MiniAppContext = createContext<MiniAppContextType | undefined>(undefined);

interface MiniAppProviderProps {
  addMiniAppOnLoad?: boolean;
  children: ReactNode;
}

export function MiniAppProvider({ children, addMiniAppOnLoad }: MiniAppProviderProps): JSX.Element {
  const [context, setContext] = useState<FrameContext | null>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMiniAppReady, setIsMiniAppReady] = useState(false);
  const readyCalledRef = useRef(false);

  // Load SDK context first
  useEffect(() => {
    const loadSDK = async () => {
      try {
        const ctx = await sdk.context;
        console.log("[MiniApp] SDK context loaded:", ctx);
        if (ctx) {
          setContext(ctx);
        }
        setIsSDKLoaded(true);
      } catch (err) {
        console.error("[MiniApp] SDK load error:", err);
        setIsSDKLoaded(true); // Set true even on error to prevent blocking
      }
    };

    loadSDK();
  }, []);

  // Call ready() when app is ready to be shown - with race condition protection
  const setMiniAppReady = useCallback(async () => {
    // Prevent multiple calls
    if (readyCalledRef.current) {
      console.log("[MiniApp] ready() already called, skipping");
      return;
    }

    if (!isSDKLoaded) {
      console.warn("[MiniApp] Attempting to call ready() before SDK is loaded");
      return;
    }

    readyCalledRef.current = true;
    console.log("[MiniApp] Calling sdk.actions.ready()...");

    try {
      await sdk.actions.ready();
      console.log("[MiniApp] ✅ sdk.actions.ready() completed - splash should hide now");
      setIsMiniAppReady(true);
    } catch (err) {
      console.error("[MiniApp] ❌ Error calling ready():", err);
      setIsMiniAppReady(true); // Set true even on error to show content
    }
  }, [isSDKLoaded]);

  const handleAddMiniApp = useCallback(async () => {
    try {
      // Check if SDK is properly initialized and we're in a Farcaster context
      if (!sdk || !sdk.actions || typeof sdk.actions.addFrame !== 'function') {
        console.warn('SDK not available or not in Farcaster context');
        return null;
      }

      const result = await sdk.actions.addFrame();
      if (result && result.result) {
        return result;
      }
      console.warn('addFrame returned undefined or invalid result');
      return null;
    } catch (error) {
      // Only log error if it's not the "not authorized" error during development
      const errorMessage = (error as Error).message || String(error);
      if (!errorMessage.includes('has not been authorized')) {
        console.error("[error] adding frame", error);
      }
      return null;
    }
  }, []);

  useEffect(() => {
    // on load, set the frame as ready
    if (isMiniAppReady && !context?.client?.added && addMiniAppOnLoad) {
      handleAddMiniApp();
    }
  }, [
    isMiniAppReady,
    context?.client?.added,
    handleAddMiniApp,
    addMiniAppOnLoad,
  ]);

  return (
    <MiniAppContext.Provider
      value={{
        isMiniAppReady,
        isSDKLoaded,
        setMiniAppReady,
        addMiniApp: handleAddMiniApp,
        context,
      }}
    >
      <FrameWalletProvider>{children}</FrameWalletProvider>
    </MiniAppContext.Provider>
  );
}

export function useMiniApp(): MiniAppContextType {
  const context = useContext(MiniAppContext);
  if (context === undefined) {
    throw new Error("useMiniApp must be used within a MiniAppProvider");
  }
  return context;
}
