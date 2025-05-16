import React, { useState, useEffect } from "react";
import { Box, Button, Header, Page, Text, Spinner, Icon } from "zmp-ui";
import { chooseImage } from "zmp-sdk";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CameraContent = () => {
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldUpload, setShouldUpload] = useState(false);
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadDefaultImage();
  }, []);

  useEffect(() => {
    if (shouldUpload) {
      handleUpload();
      setShouldUpload(false);
    }
  }, [imageUri, shouldUpload]);

  const loadDefaultImage = async () => {
    try {
      const imageUrl =
        "https://raw.githubusercontent.com/JavaKhangNguyen/Acnes-Detection/main/test/test2.jpg";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setFile(objectURL);
      setImageUri(objectURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const res = await chooseImage({
        sourceType: ["album", "camera"],
        count: 1,
      });
      const [selectedFile] = res.filePaths;
      setFile(selectedFile);
      const blob = await (await fetch(selectedFile)).blob();
      const objectURL = URL.createObjectURL(blob);
      setImageUri(objectURL);
      setShouldUpload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);

      const blob = await (await fetch(imageUri)).blob();
      const formData = new FormData();
      formData.append("image", blob);

      const response = await axios.post(
        "https://acne10.aiotlab.io.vn/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setShouldUpload(false);
      navigate("/result_medical", { state: { result: response.data } });
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      setShouldUpload(false);
    }
  };

  const tryFeature = () => {
    navigate("/guild");
  };

  return (
    <Box className="bg-background py-6 px-4 md:px-8 flex flex-col items-center">
      <img
        src="https://res.cloudinary.com/dwljkfseh/image/upload/v1733744746/causes2_nb5vyz.png"
        alt="Centered"
        className="w-full max-w-md rounded-xl object-cover mb-4"
      />
      <div className="bg-white p-4 rounded-lg w-full max-w-md text-center">
        <p className="font-bold text-lg md:text-xl text-[#4E2E2F]">
          Take a picture of how you look today!
        </p>
      </div>

      <div className="mt-6 w-full max-w-md flex flex-col gap-5">
        <button
          onClick={handleChooseImage}
          className="flex items-center justify-between w-full rounded-xl bg-blue-500 text-white p-4 hover:bg-blue-600 transition"
        >
          <img
            src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730650194/5071156_ww7gou.png"
            alt="Take new"
            className="w-14 h-14 object-cover"
          />
          <p className="font-semibold text-base md:text-lg">
            Take a new picture
          </p>
          <Icon icon="zi-chevron-right" />
        </button>

        <button
          onClick={() => setShouldUpload(true)}
          className="flex items-center justify-between w-full rounded-xl bg-blue-500 text-white p-4 hover:bg-blue-600 transition"
        >
          <img
            src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730650408/3476744_s9apiv.png"
            alt="Test image"
            className="w-14 h-14 object-cover"
          />
          <p className="font-semibold text-base md:text-lg">
            Test Image for Diagnosis
          </p>
          <Icon icon="zi-chevron-right" />
        </button>

        <button
          onClick={tryFeature}
          className="flex items-center justify-between w-full rounded-xl bg-blue-500 text-white p-4 hover:bg-blue-600 transition"
        >
          <img
            src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730651555/4961736_zca8t0.png"
            alt="Guide"
            className="w-14 h-14 object-cover"
          />
          <p className="font-semibold text-base md:text-lg">
            Guide to User Diagnosis
          </p>
          <Icon icon="zi-chevron-right" />
        </button>
      </div>
    </Box>
  );
};

const HomePage: React.FunctionComponent = () => {
  return (
    <Page>
      <div>
        <Header title="Camera" showBackIcon={true} />
        <div className="flex justify-center bg-white pt-2">
          <div className="relative text-center py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg mb-5 w-[96%] max-w-4xl">
            <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-lg">
              Camera
            </h1>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
      <CameraContent />
    </Page>
  );
};

export default HomePage;
