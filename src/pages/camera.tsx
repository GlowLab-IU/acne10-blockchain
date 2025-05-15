import React, { useState, useEffect } from "react";
import { Box, Button, Header, Page, Text, Spinner, Icon } from "zmp-ui";
import { chooseImage } from "zmp-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faImage,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// The content of the homepage, including the buttons for interaction.
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
    <Box
      className="bg-background"
      style={{
        paddingTop: "30px",
        paddingBottom: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* New Image and Subtitle */}
      <img
        src="https://res.cloudinary.com/dwljkfseh/image/upload/v1733744746/causes2_nb5vyz.png"
        alt="Centered Image"
        style={{
          width: "70%",
          objectFit: "cover",
          marginBottom: "20px",
          borderRadius: "7%",
        }}
      />
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "3%",
          borderRadius: "8px",
          display: "contents",
          width: "95%",
        }}
      >
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#4E2E2F",
            letterSpacing: "0.5px",
            width: "65%",
            textAlign: "center",
          }}
        >
          Take a picture of how you look today!
        </p>
      </div>
      <br />
      <br />

      {/* Take a New Picture Button */}
      <button
        onClick={handleChooseImage}
        style={{
          marginBottom: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          borderRadius: "12px",
          backgroundColor: "rgba(68 ,141, 177, 90%)",
          padding: "10px",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730650194/5071156_ww7gou.png"
          alt="Take a new picture"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
            fontWeight: "bold",
          }}
        />

        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Take a new picture
        </p>
        <Icon icon="zi-chevron-right" />
      </button>

      {/* Test Image for Diagnosis Button */}
      <button
        onClick={() => setShouldUpload(true)}
        style={{
          marginBottom: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          borderRadius: "12px",
          backgroundColor: "rgba(68 ,141, 177, 90%)",
          padding: "10px",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730650408/3476744_s9apiv.png"
          alt="Test image"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
          }}
        />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Test Image for Diagnosis
        </p>
        <Icon icon="zi-chevron-right" />
      </button>

      {/* Guide to User Diagnosis Button */}
      <button
        onClick={tryFeature}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          borderRadius: "12px",
          backgroundColor: "rgba(68, 141, 177, 90%)",
          padding: "10px",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730651555/4961736_zca8t0.png"
          alt="Guide"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
          }}
        />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Guide to User Diagnosis
        </p>
        <Icon icon="zi-chevron-right" />
      </button>
    </Box>
  );
};

const HomePage: React.FunctionComponent = () => {
  return (
    <Page>
      <div>
        <Header title="Camera" showBackIcon={true} />
        <div className="flex justify-center bg-white pt-2">
          <div
            className="relative text-center py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg mb-5"
            style={{ width: "96%" }}
          >
            <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">
              <span className="drop-shadow-lg">Camera</span>
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
