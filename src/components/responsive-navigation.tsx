import React, { FC } from "react";
import { Navigation } from "./navigation";
import { SidebarNavigation } from "./sidebar-navigation";

export const ResponsiveNavigation: FC = () => {
  return (
    <>
      <div className="md:hidden">
        <Navigation />
      </div>
      <div className="hidden md:block">
        <SidebarNavigation />
      </div>
    </>
  );
};
