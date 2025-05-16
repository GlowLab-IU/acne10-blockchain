import React from "react";
import { Box } from "zmp-ui";

const Footer: React.FunctionComponent = () => (
  <Box
    className="
      bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500
      text-white px-6 py-4 flex justify-center items-center
      shadow-inner rounded-t-xl
      select-none
    "
  >
    <p className="text-center text-sm font-medium tracking-wide">
      © 2025 GlowLab. All rights reserved.
    </p>
  </Box>
);

export default Footer;
