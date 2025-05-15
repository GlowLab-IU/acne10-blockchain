import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router";

export const Components: FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      <div
        onClick={() => navigate("/statistics")}
        className="flex flex-col space-y-2 items-center"
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "25%",
          padding: "10px",
          boxShadow: "4px 7px 7px rgba(0, 0, 0, 0.15)",
        }}
      >
        <img
          className="w-12 h-12"
          src={
            "https://res.cloudinary.com/dwljkfseh/image/upload/v1724481118/report_pljl2c.png"
          }
        />
        <Text size="xxSmall" className="text-gray">
          Statistics
        </Text>
      </div>
      <div
        onClick={() => navigate("/Calendar")}
        className="flex flex-col space-y-2 items-center"
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "25%",
          padding: "10px",
          boxShadow: "4px 7px 7px rgba(0, 0, 0, 0.15)",
        }}
      >
        <img
          className="w-12 h-12"
          src={
            "https://res.cloudinary.com/dwljkfseh/image/upload/v1724481115/calendar2_xmamut.png"
          }
        />
        <Text size="xxSmall" className="text-gray">
          Calendar
        </Text>
      </div>
      <div
        onClick={() => navigate("/treatments")}
        className="flex flex-col space-y-2 items-center"
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "25%",
          padding: "10px",
          boxShadow: "4px 7px 7px rgba(0, 0, 0, 0.15)",
        }}
      >
        <img
          className="w-12 h-12"
          src={
            "https://res.cloudinary.com/dwljkfseh/image/upload/v1724481115/doctors_ctjwr9.png"
          }
        />
        <Text size="xxSmall" className="text-gray">
          Treatments
        </Text>
      </div>
      <div
        onClick={() => navigate("/Survey")}
        className="flex flex-col space-y-2 items-center"
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "25%",
          padding: "10px",
          boxShadow: "4px 7px 7px rgba(0, 0, 0, 0.15)",
        }}
      >
        <img
          className="w-12 h-12"
          src={
            "https://res.cloudinary.com/dwljkfseh/image/upload/v1724481117/medical_report_huutfa.png"
          }
        />
        <Text size="xxSmall" className="text-gray">
          Survey
        </Text>
      </div>
    </Box>
  );
};
