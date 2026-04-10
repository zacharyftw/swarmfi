"use client";

import dynamic from "next/dynamic";

// RainbowKit accesses localStorage/indexedDB during render,
// which breaks SSR. Load the full provider tree client-only.
const ProvidersInner = dynamic(() => import("./providers-inner"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ProvidersInner>{children}</ProvidersInner>;
}
