import React, { useMemo, FC } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { getConfig } from "../utils/config";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";
import SurveyPage from "../pages/Survey";
import HomePage from "../pages/index/index";
import { UserIdUpdater } from "../state";

interface MyAppProps {
  network: WalletAdapterNetwork;
}

const MyApp: FC<MyAppProps> = ({ network }) => {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <RecoilRoot>
            <UserIdUpdater />
            <ConfigProvider
              cssVariables={{
                "--zmp-primary-color": getConfig(
                  (c) => c.template.primaryColor
                ),
                "--zmp-background-color": "#f4f5f6",
              }}
            >
              <App>
                <SnackbarProvider>
                  <ZMPRouter>
                    <Routes>
                      <Route path="/survey" element={<SurveyPage />} />

                      <Route
                        path="/*"
                        element={
                          <React.Fragment>
                            <Layout>
                              <Routes>
                                <Route
                                  path="/homepage"
                                  element={<HomePage />}
                                />
                              </Routes>
                            </Layout>
                          </React.Fragment>
                        }
                      />
                    </Routes>
                  </ZMPRouter>
                </SnackbarProvider>
              </App>
            </ConfigProvider>
          </RecoilRoot>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default MyApp;
