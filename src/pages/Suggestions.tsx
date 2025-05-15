import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { useLocation } from "react-router-dom";
import {
  List,
  Button,
  Page,
  Text,
  useNavigate,
  Header,
  Icon,
  Spinner,
} from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faFloppyDisk,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { chooseImage } from "zmp-sdk";
import { default as axios } from "axios";
import logo from "../static/logo.png";

export const getSkincareIngredients = (objectType: any) => {
  let customName = "";
  let suggestionsArray = [""];

  switch (objectType) {
    case "acne_scars":
      customName = "Acne Scars";
      suggestionsArray = [
        "BHA",
        "AHA",
        "Jessner Solution",
        "Trichloroacetic acid",
        "Doctor consultation",
      ];
      break;
    case "blackhead":
      customName = "Blackhead";
      suggestionsArray = [
        "Retinoid (tretinoin, adapalene, tazarotene, trifarotene)",
      ];
      break;
    case "cystic":
      customName = "Cystic";
      suggestionsArray = [
        "Retinoid (tretinoin, adapalene, tazarotene, trifarotene)",
        "Benzoyl Peroxidase (BPO)",
        "Topical antibiotics (prescribed by a doctor)",
      ];
      break;
    case "flat_wart":
      customName = "Flat Wart";
      suggestionsArray = [
        "BHA",
        "Trichloroacetic acid",
        "Flourouracil",
        "Cantharidin 0.7%",
        "imiquimod",
        "Doctor consultation",
      ];
      break;
    case "folliculitis":
      customName = "Folliculitis";
      suggestionsArray = ["Doctor consultation"];
      break;
    case "keloid":
      customName = "Keloid";
      suggestionsArray = [
        "Corticosteroid (tape/topical)",
        "Silicone gel sheeting",
        "Doctor consultation",
      ];
      break;
    case "milium":
      customName = "Milium";
      suggestionsArray = [
        "Retinoid (tretinoin, adapalene, tazarotene, trifarotene)",
      ];
      break;
    case "papular":
      customName = "Papular";
      suggestionsArray = [
        "Retinoid (tretinoin, adapalene, tazarotene, trifarotene)",
        "Benzoyl Peroxidase (BPO)",
        "Topical antibiotics (prescribed by a doctor)",
      ];
      break;
    case "purulent":
      customName = "Purulent";
      suggestionsArray = [
        "Retinoid (tretinoin, adapalene, tazarotene, trifarotene)",
        "Benzoyl Peroxidase (BPO)",
        "Topical antibiotics (prescribed by a doctor)",
      ];
      break;
    case "sebo-crystan-conglo":
      customName = "Acne Conglobate";
      suggestionsArray = [
        "Isotretinoin + antibiotics (oral) + Azelaic acid",
        "Adapalene",
        "Benzoyl Peroxidase (BPO)",
      ];
      break;
    case "whitehead":
      customName = "Whitehead";
      suggestionsArray = [
        "Retinoid (tretinoin, adapalene, tazarotene, trifarotene)",
      ];
      break;
    default:
      customName = "Syringoma";
      suggestionsArray = ["Trichloroacetic acid", "Doctor consultation"];
  }

  return { customName, suggestionsArray };
};

const Suggestions: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const objectTypes: string[] = location.state;
  const [imageUri, setImageUri] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldUpload, setShouldUpload] = useState(false);
  const [outputImage, setOutputImage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const userInfo = useRecoilValue(userState);

  useEffect(() => {
    if (shouldUpload) {
      handleUpload();
      setShouldUpload(false);
    }
  }, [imageUri, shouldUpload]);

  const handleChooseImage = async () => {
    try {
      const res = await chooseImage({
        sourceType: ["album"],
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
      setShowSuggestions(false);
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
      navigate("/result", { state: { result: response.data } });
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      setShowSuggestions(true);
      setShouldUpload(false);
    }
  };

  const handleClickSave = () => {
      navigate("/index");
  };

  const handleChatbotClick = () => {
    console.log("Navigating to chatbot with conditions:", objectTypes);
    const conditionNames = objectTypes.map((object: string) => {
      const { customName } = getSkincareIngredients(object);
      return customName;
    });
    navigate("/chatbot", { state: { skinConditions: conditionNames } });
  };

  return (
    <Page>
      <Header
        className="bg-gradient-to-r from-[rgb(37,216,243)] to-[hsl(177,92%,53%)] app-header no-border pl-4 flex-none pb-[6px]"
        title={
          (
            <Text.Title size="normal" className="text-white !font-medium">
              Suggestions
            </Text.Title>
          ) as unknown as string
        }
        showBackIcon={true}
        backIcon={<Icon icon="zi-arrow-left" className="text-white" />}
        backgroundColor="#FF5F8F"
      />
      <div className="flex justify-center mb-[10px]">
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1726567757/doctors3_gunwlx.jpg"
          alt="Expert advice"
          className=""
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <Text className=" ml-[15px] text-lg font-bold underline">
        &#10020; Expert Advice for You Includes:
      </Text>
      {showSuggestions ? (
        <div className="info-container !mt-[20px]">
          {objectTypes.map((object: any, index: any) => {
            const { customName, suggestionsArray } =
              getSkincareIngredients(object);
            return (
              <List.Item
                className="!mb-[15px] !m-[10px] bg-white p-4 rounded-lg shadow-md"
                key={index}
              >
                <div className="suggestions-container">
                  <Text className="information-text  mb-[4px] text-gray-700">
                    &#10004; Type:{" "}
                    <span className="font-bold text-blue-600">
                      {customName}{" "}
                    </span>
                  </Text>
                  <Text className="information-text  mb-[4px]  text-gray-700">
                    {" "}
                    &#10004; Ingredient suggestions:{" "}
                    <span className="font-bold text-emerald-600">
                      {suggestionsArray.join(", ")}{" "}
                    </span>
                  </Text>
                </div>
              </List.Item>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          {loading && <Spinner visible logo={logo} />}
        </div>
      )}
      <div className="button-container flex justify-center mt-4 space-x-4">
        <Button
          className="flex-1 shadow-lg transition-transform transform hover:scale-105"
          variant="primary"
          size="large"
          onClick={handleChooseImage}
          style={{
            borderRadius: "8px",
            padding: "10px 0",
            backgroundColor: "#007bff", // Use your desired primary color
          }}
        >
          <Text size="large" className="font-semibold text-white">
            <FontAwesomeIcon
              bounce
              size="lg"
              icon={faArrowUpFromBracket}
              style={{ marginRight: "10px" }}
            />
            Upload new
          </Text>
        </Button>

        <Button
          className="flex-1 shadow-lg transition-transform transform hover:scale-105"
          variant="primary"
          size="large"
          onClick={handleClickSave}
          style={{
            borderRadius: "8px",
            padding: "10px 0",
            backgroundColor: "#f97316", // Orange color
          }}
        >
          <Text size="large" className="font-semibold text-white">
            <FontAwesomeIcon
              bounce
              size="lg"
              icon={faFloppyDisk}
              style={{ marginRight: "10px" }}
            />
            Save
          </Text>
        </Button>
      </div>
      
      <div className="flex justify-center mt-4">
        <Button
          className="w-full shadow-lg transition-transform transform hover:scale-105 mx-4"
          variant="primary"
          size="large"
          onClick={handleChatbotClick}
          style={{
            borderRadius: "8px",
            padding: "10px 0",
            backgroundColor: "#10b981", // Green color
          }}
        >
          <Text size="large" className="font-semibold text-white">
            <FontAwesomeIcon
              bounce
              size="lg"
              icon={faCommentDots}
              style={{ marginRight: "10px" }}
            />
            Chat with AI Assistant
          </Text>
        </Button>
      </div>
    </Page>
  );
};

export default Suggestions;
