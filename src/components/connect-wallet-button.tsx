import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { cn } from "../utils/cn";
import { buttonVariants } from "./ui/button";
import React from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function ConnectWalletButton({ children }: PropsWithChildren) {
  return (
    <WalletMultiButtonDynamic className={cn(buttonVariants())}>
      {children}
    </WalletMultiButtonDynamic>
  );
}
