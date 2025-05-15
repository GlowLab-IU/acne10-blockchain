import React, { Suspense } from "react";
import { Link } from "react-router-dom";
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
  const Navbar = () => (
    <Box className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">GlowLab</h1>
      <Box className="flex space-x-6">
        <Link
          to="/camera"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <i className="fas fa-camera"></i>
          <span>Camera</span>
        </Link>
        <Link
          to="/"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link
          to="/shopping"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Shopping</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <i className="fas fa-user"></i>
          <span>Personal</span>
        </Link>
      </Box>
    </Box>
  );

  const Footer = () => (
    <Box className="bg-gray-800 text-white p-4 mt-4">
      <p className="text-center text-sm">
        © 2025 GlowLab. All rights reserved.
      </p>
    </Box>
  );
  return (
    <Page className="relative flex-1 flex flex-col bg-gray-100">
      <Navbar />
      <Welcome />
      <Box className="flex-1 overflow-auto p-4 space-y-6">
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
        <Divider />
      </Box>
      <Footer />
    </Page>
  );
};

export default HomePage;
