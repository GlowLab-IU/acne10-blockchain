import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import scanIcon from "../static/navigation/scan.png";

const tabs = {
  "/homepage": {
    label: "Home",
    icon: <Icon icon="zi-home" />,
  },
  "/camera": {
    label: "Camera",
    icon: <Icon icon="zi-camera" />,
  },
  "/cart": {
    label: "Shopping",
    icon: <CartIcon />,
  },
  "/profile": {
    label: "Personal",
    icon: <Icon icon="zi-user-circle" />,
  },
};

type TabKeys = keyof typeof tabs;

export const SidebarNavigation: FC = () => {
  return (
    <div className="flex flex-col h-full p-4 border-r border-gray-200">
      {Object.keys(tabs).map((path: TabKeys) => (
        <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-gray-100 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          {path === "/camera" ? (
            <img
              src={scanIcon}
              alt="Camera"
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
          ) : (
            React.cloneElement(tabs[path].icon, {
              style: { width: 24, height: 24, marginRight: 8 },
            })
          )}
          <span>{tabs[path].label}</span>
        </NavLink>
      ))}
    </div>
  );
};
