import React from "react";
import { FC } from "react";
import { Box, Input, useNavigate, Icon } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={4} className="bg-white flex items-center justify-between">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Exploring Innovations with AIoT Lab VN..."
        className="flex-grow bg-[rgb(255,255,255)] text-white rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm "
      />

      <button
        onClick={() => navigate("/notification")}
        className="notification-button ml-4 flex items-center justify-center"
        style={{
          width: "55px",
          height: "50px",
          borderRadius: "15%",
          backgroundColor: "rgb(255,255,255)",
          border: "0.1px solid rgba(200, 200, 200, 0.7)",
          boxShadow: "4px 7px 7px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1733745668/1156949_dkneis.png"
          alt="Notification Icon"
          style={{
            width: "25px",
            height: "25px",
          }}
        />
      </button>

      <button
        onClick={() => navigate("/category")}
        className="notification-button ml-4 flex items-center justify-center"
        style={{
          width: "55px",
          height: "50px",
          borderRadius: "15%",
          backgroundColor: "rgb(255,255,255)",
          border: "0.1px solid rgb(200,200,200,0.7)",
          boxShadow: "4px 7px 7px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1733745938/11026353_koc5j8.png"
          alt="categories"
          style={{ width: "25px", height: "25px" }}
        />
      </button>
    </Box>
  );
};
