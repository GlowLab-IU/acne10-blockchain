import React, { FC } from "react";
import { Box, Header, Page, Text, BottomNavigation } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePhone,
  faEnvelope,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const doctors = [
  {
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1726568511/avt1_dsjxc1.jpg",
    name: "Dr. Nguyen Van A",
    specialty: "Clinical Dermatology",
    address: "Phòng Khám Da Liễu Sài Gòn (SGC)",
    mail: "nguyenvanA@gmail.com",
    phone: "013456789",
  },
  {
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1726568512/avt6_simpqo.jpg",
    name: "Dr. Le Thi A",
    specialty: "Cosmetic Dermatology",
    address: "Phòng khám Thẩm mỹ da",
    mail: "nguyenvanA@gmail.com",
    phone: "013456789",
  },
  {
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1726568512/avt2_sc7zzy.jpg",
    name: "Dr. Le Thi B",
    specialty: "Dermatologic Surgery",
    address: "Bệnh viện Da liễu TP HCM",
    mail: "nguyenvanA@gmail.com",
    phone: "013456789",
  },
  {
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1726568527/avt5_au4ehm.jpg",
    name: "Dr. Nguyen Van C",
    specialty: "Dermatopathology",
    address: "Khoa Da liễu - Bệnh viện Gia An 115",
    mail: "nguyenvanA@gmail.com",
    phone: "013456789",
  },
];

const Treatments: FC = () => {
  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMailClick = (mail: string) => {
    window.location.href = `mailto:${mail}`;
  };

  const handleInfoClick = (doctor: any) => {
    alert(`Phone: ${doctor.phone}\nEmail: ${doctor.mail}`);
  };

  return (
    <Page>
      <div
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Header title="Treatments" />

        {/* Banner Image */}
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://res.cloudinary.com/dwljkfseh/image/upload/v1727089859/contact2_zdtbp7.png"
            alt="Banner"
            style={{ width: "68%", height: "auto" }}
          />
        </Box>
        <div
          className="relative flex justify-center items-center text-center py-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-lg shadow-2xl mb-6"
          style={{ width: "98%", height: "auto", margin: "0 auto" }}
        >
          <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase">
            <span className="drop-shadow-lg">Doctors Available</span>
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1.5 w-3/4 bg-white rounded-full opacity-40"></div>
        </div>
        <br />
        <Box>
          {/* Grid layout for Doctors */}
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              justifyItems: "center",
              paddingBottom: "50px",
            }}
          >
            {doctors.map((doctor, index) => (
              <Box
                key={index}
                style={{
                  backgroundColor: "#E0FFFF", // Light neon blue background
                  padding: "20px",
                  borderRadius: "8%",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "300px",
                  margin: "0 auto",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                    padding: "15px",
                  }}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "5px",
                  }}
                >
                  {doctor.name}
                </Text>
                <Text style={{ color: "#666", marginBottom: "5px" }}>
                  {doctor.specialty}
                </Text>
                <Text style={{ color: "#666", marginBottom: "15px" }}>
                  {doctor.address}
                </Text>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    backgroundColor: "#4169E1",
                    padding: "10px 0",
                    borderRadius: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSquarePhone}
                    size="lg"
                    color="#FFFFFF"
                    style={{
                      cursor: "pointer",
                      fontSize: "1.7em",
                      transition: "transform 0.3s ease, color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                      e.currentTarget.style.color = "#FFD700";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onClick={() => handlePhoneClick(doctor.phone)}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="lg"
                    color="#FFFFFF"
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease, color 0.3s ease",
                      fontSize: "1.7em",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                      e.currentTarget.style.color = "#FFD700";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onClick={() => handleMailClick(doctor.mail)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    size="lg"
                    color="#FFFFFF"
                    style={{
                      cursor: "pointer",
                      fontSize: "1.7em",
                      transition: "transform 0.3s ease, color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                      e.currentTarget.style.color = "#FFD700";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onClick={() => handleInfoClick(doctor)}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
    </Page>
  );
};

export default Treatments;
