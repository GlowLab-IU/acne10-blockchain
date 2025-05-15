import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { getConfig } from "../utils/config";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";
import SurveyPage from "../pages/Survey";
import HomePage from "../pages/index/index";
import { UserIdUpdater } from "../state";

const MyApp = () => {
  return (
    <RecoilRoot>
      <UserIdUpdater />
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Routes>
                {/* Trang SurveyPage không bọc trong Layout */}
                <Route path="/" element={<SurveyPage />} />

                {/* Các route khác sẽ được bọc trong Layout */}
                <Route
                  path="/*"
                  element={
                    <Layout>
                      <Routes>
                        <Route path="/index" element={<HomePage />} />
                        {/* Các route khác như trang người dùng, trang sản phẩm */}
                      </Routes>
                    </Layout>
                  }
                />
              </Routes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};

export default MyApp;
