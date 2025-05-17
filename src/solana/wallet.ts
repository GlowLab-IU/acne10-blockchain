import { useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import React, { FC, useMemo } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

interface WalletConnectProps {
  children?: React.ReactNode;
}

export const WalletConnect: FC<WalletConnectProps> = ({ children }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const solanaNetwork = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(solanaNetwork), [solanaNetwork]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
    ],
    [solanaNetwork]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </ConnectionProvider>
  );
};

export const useConnectedWallet = () => {
  const wallet = useWallet();
  return wallet;
};
