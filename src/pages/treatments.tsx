import React, { FC } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
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
      <div className="bg-white">
        <Header title="Treatments" />

        {/* Banner */}
        <div className="flex justify-center py-4 px-2">
          <img
            src="https://res.cloudinary.com/dwljkfseh/image/upload/v1727089859/contact2_zdtbp7.png"
            alt="Banner"
            className="w-4/5 md:w-2/3 lg:w-1/2 h-auto"
          />
        </div>

        {/* Title */}
        <div className="relative flex justify-center items-center text-center py-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-xl shadow-lg mx-4 md:mx-10 mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide uppercase drop-shadow-lg">
            Doctors Available
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-40"></div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-16">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-cyan-100 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-40 h-40 rounded-full object-cover mb-4"
              />
              <Text className="text-lg font-semibold text-gray-800 mb-1">
                {doctor.name}
              </Text>
              <Text className="text-sm text-gray-600 mb-1">
                {doctor.specialty}
              </Text>
              <Text className="text-sm text-gray-500 mb-4">
                {doctor.address}
              </Text>
              <div className="flex justify-around w-full bg-blue-600 rounded-lg py-2">
                <FontAwesomeIcon
                  icon={faSquarePhone}
                  className="text-white text-xl cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-yellow-300"
                  onClick={() => handlePhoneClick(doctor.phone)}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-white text-xl cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-yellow-300"
                  onClick={() => handleMailClick(doctor.mail)}
                />
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="text-white text-xl cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-yellow-300"
                  onClick={() => handleInfoClick(doctor)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Treatments;
