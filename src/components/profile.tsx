import React, { FC, useState } from "react";
import {
  Box,
  Header,
  Page,
  Text,
  Button,
  Avatar,
  Input,
  Spinner,
  Icon,
} from "zmp-ui";
import { userState, phoneState, phoneNumber } from "../../src/state";
import { useRecoilValueLoadable, useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { pushAccountInfo } from "../database/insert";
const ProfilePage: FC = () => {
  const userLoadable = useRecoilValueLoadable(userState);
  const userInfo = useRecoilValue(userState);
  const phoneNum = phoneNumber;

  const initialAccountInfo = {
    fullname: userInfo.name,
    id: userInfo.id,
    dob: "January 1, 2002",
    email: "aiot-lab-vn@example.com",
    phone: phoneNum,
    avatarUrl:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1733160472/doctur_rbel2q.png",
  };

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [accountInfo, setAccountInfo] = useState(initialAccountInfo);

  const handleInputChange = (field: string, value: string) => {
    setAccountInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAvatar = () => {
    console.log("Updated avatar:", accountInfo.avatarUrl);
    setIsEditingAvatar(false);
  };

  const handlePushData = () => {
    try {
      handleSaveAvatar();

      handleSaveInfo();

      pushAccountInfo(userInfo.id, initialAccountInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveInfo = () => {
    console.log("Updated account info:", accountInfo);
    setIsEditingInfo(false);
  };

  const handleCancelEditAvatar = () => {
    setAccountInfo((prev) => ({
      ...prev,
      avatarUrl: initialAccountInfo.avatarUrl,
    }));
    setIsEditingAvatar(false);
  };

  const handleCancelEditInfo = () => {
    setAccountInfo(initialAccountInfo);
    setIsEditingInfo(false);
  };

  let content;

  switch (userLoadable.state) {
    case "loading":
      content = (
        <Box className="flex justify-center items-center h-full">
          <Spinner size="large" />
        </Box>
      );
      break;
    case "hasError":
      content = (
        <Box className="flex justify-center items-center h-full">
          <Text className="text-red-600 font-medium">
            Failed to load user data.
          </Text>
        </Box>
      );
      break;
    case "hasValue":
      const user = userLoadable.contents;

      content = (
        <Box className="flex flex-col items-center p-6">
          {/* Avatar Section */}
          <Box className="relative mb-6">
            <Avatar
              src={accountInfo.avatarUrl}
              size={200}
              className="shadow-lg border-4 border-indigo-500"
            />

            <Box
              onClick={() => setIsEditingAvatar(true)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="sm"
                className="text-indigo-500"
              />
            </Box>
          </Box>
          {/* Name */}
          <Text.Title className="text-center text-2xl font-bold mb-1">
            {user.name}
          </Text.Title>
          <Text className="text-gray-500 mb-6">{user.position || "User"}</Text>
          {isEditingAvatar && (
            <Box className="flex flex-col items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setAccountInfo((prev) => ({
                        ...prev,
                        avatarUrl: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Box className="flex space-x-4 mt-2">
                <Button
                  onClick={handleCancelEditAvatar}
                  className="!bg-gray-400"
                >
                  Cancel
                </Button>
                <Button onClick={handlePushData} className="!bg-indigo-500">
                  Save
                </Button>
              </Box>
            </Box>
          )}

          {/* Upgrade to Premium */}
          <Box className="w-full mb-8">
            <Box className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-600 to-orange-400 text-white text-center">
              <Text.Title level={4} className="mb-3 font-extrabold">
                Upgrade to Premium
              </Text.Title>
              <Text className="mb-4 text-sm">
                Unlock exclusive features and enjoy an enhanced experience.
              </Text>
              <Button className="!bg-[rgb(238,48,15)]  !text-white font-semibold px-4 py-2 rounded-full shadow-md hover:!bg-red-700 transition-all duration-300">
                Upgrade Now
              </Button>
            </Box>
          </Box>

          {/* Personal Information */}
          <Box className="w-full space-y-4">
            <Text.Title level={4} className="font-semibold text-indigo-600">
              Personal Information
            </Text.Title>
            <Box className="p-6 rounded-xl shadow-md bg-[rgb(174,225,252)]">
              {[
                {
                  label: "Name",
                  field: "fullname",
                  value: accountInfo.fullname,
                },
                { label: "ID", field: "id", value: accountInfo.id },
                {
                  label: "Date of Birth",
                  field: "dob",
                  value: accountInfo.dob,
                },
                { label: "Email", field: "email", value: accountInfo.email },
                { label: "Phone", field: "phone", value: accountInfo.phone },
              ].map((item, index) => (
                <Box
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0"
                >
                  <Text className="text-gray-700 font-medium">
                    {item.label}
                  </Text>
                  {isEditingInfo ? (
                    <Input
                      value={item.value}
                      onChange={(e) =>
                        handleInputChange(item.field, e.target.value)
                      }
                    />
                  ) : (
                    <Text className="text-gray-900">{item.value}</Text>
                  )}
                </Box>
              ))}
            </Box>
            <Box className="flex space-x-4 justify-end mt-4">
              {isEditingInfo ? (
                <>
                  <Button
                    onClick={handleCancelEditInfo}
                    className="!bg-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAvatar} className="!bg-indigo-500">
                    Save
                  </Button>
                </>
              ) : (
                <Button onClick={handlePushData} className="!bg-indigo-500">
                  Edit Information
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      );
      break;
  }

  return (
    <Page className="bg-gray-100 min-h-screen">
      <Header
        title="Account Information"
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
      />
      {content}
    </Page>
  );
};

export default ProfilePage;
