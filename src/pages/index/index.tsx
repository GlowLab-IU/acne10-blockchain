import React, { Suspense } from "react";
import { Box, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Components } from "./components";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { News } from "./news";

import { ProductList } from "./product-list";
import { Divider } from "../../components/divider";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Inquiry />
        <Suspense>
          <Components />
        </Suspense>
        <Banner />
        <Divider />
        <News />
        <Divider />
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};

export default HomePage;
