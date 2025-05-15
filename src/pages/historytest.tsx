{/*import React, { FC, useEffect, useState } from "react";
import { Box, Header, Page, Text, BottomNavigation, Icon } from "zmp-ui";
import { Divider } from "../components/divider";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { decodeBase64 } from "./Result_medical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { initializeApp } from "firebase/app";
import { selectedDateGlobal } from "../pages/Calendar";

const firebaseConfig = {
  apiKey: "AIzaSyDz8sjOP6FWU5CghOimZnLryKWMwqcGhGo",
  authDomain: "acnes-8b16a.firebaseapp.com",
  projectId: "acnes-8b16a",
  storageBucket: "acnes-8b16a.appspot.com",
  messagingSenderId: "811496508528",
  appId: "1:811496508528:web:f4d89974eafc89b973b8b5",
  measurementId: "G-PTFN7B9F9D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface SkincareData {
  tele: string;
  ngày: {
    ngày: Date | any;
    hình: string;
    bounding: Label[];
  }[];
}

interface Label {
  tên_Label: string;
  count: number;
  suggestion: string;
}

const Records: FC = () => {
  const [data, setData] = useState<SkincareData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [groupedData, setGroupedData] = useState<Map<string, any[]>>(new Map());
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts

      const querySnapshot = await getDocs(collection(db, "skincareData"));
      const docsData = querySnapshot.docs.map(
        (doc) => doc.data() as SkincareData
      );

      const sortedData = docsData
        .flatMap((entry) =>
          entry.ngày.map((item) => ({
            ...item,
            ngày: item.ngày instanceof Date ? item.ngày : item.ngày.toDate(),
          }))
        )
        .sort((a, b) => a.ngày.getTime() - b.ngày.getTime());

      const groupedData = sortedData.reduce((acc, item) => {
        const dateKey = item.ngày.toLocaleDateString();
        if (!acc.has(dateKey)) {
          acc.set(dateKey, []);
        }
        acc.get(dateKey)!.push(item);
        return acc;
      }, new Map<string, any[]>());

      setGroupedData(groupedData);
      setLoading(false); // Set loading to false when fetching is complete
    };

    fetchData();
  }, []);

  const handleDateClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
    setSelectedLabel(null);
  };

  const handleLabelClick = (label: string) => {
    setSelectedLabel(label === selectedLabel ? null : label);
  };

  const formatSelectedDateGlobal = selectedDateGlobal
    ? selectedDateGlobal.toLocaleDateString()
    : null;

  return (
    <Page>
      <Header title="History" />
      <Box
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1727118490/came_ts14jv.png')",
          backgroundSize: "cover",
          height: "700px", // Adjust height as needed
          padding: "8px",
        }}
      >
        <Text
          style={{
            padding: "10px",
            fontSize: "24px",
            fontWeight: "bold",
            paddingBottom: "35px",
          }}
        >
          &#10020; Treatment records:
        </Text>

        {/* Show loading message while data is being fetched 
        {loading ? (
          <Text style={{ fontSize: "20px", color: "gray" }}>
            Wait for loading...
          </Text>
        ) : (
          <>
            {/* If no data for the selected date, show "No data" 
            {groupedData.size === 0 ? (
              <Text style={{ fontSize: "18px", color: "red", marginTop: "20px" }}>
                No data
              </Text>
            ) : (
              [...groupedData.entries()].map(([dateKey, items]) => (
                <Box
                  key={dateKey}
                  className="info-container rounded-lg shadow-md bg-white mb-2"
                  style={{ backgroundColor: "#f0f8ff" }}
                >
                  {formatSelectedDateGlobal === dateKey && (
                    <>
                      <Text
                        onClick={() => handleDateClick(dateKey)}
                        style={{
                          cursor: "pointer",
                          color: "#28a745",
                          fontWeight: "bold",
                          fontSize: "1.2em",
                          padding: "20px",
                        }}
                      >
                        <span style={{ marginRight: "7px" }}>Test: </span>{" "}
                        {dateKey}
                        <span style={{ marginLeft: "145px" }}>
                          <FontAwesomeIcon icon={faSquareCaretDown} />
                        </span>
                      </Text>

                      {selectedDate === dateKey && (
                        <Box
                          className="mt-4"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          {items.map((item, index) => (
                            <Box
                              key={index}
                              className="mb-6 p-4 rounded-md shadow-sm"
                              style={{
                                backgroundColor: "#e6f7ff",
                                flex: "1 1 calc(30% - 1rem)",
                                margin: "0.05rem",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#6c757d",
                                  fontSize: "1em",
                                  marginBottom: "0.7em",
                                }}
                              >
                                Detected at{" "}
                                {item.ngày instanceof Date
                                  ? item.ngày.toLocaleString()
                                  : item.ngày.toDate().toLocaleString()}
                              </Text>

                              <img
                                className="w-full h-auto rounded-md shadow-md mb-3"
                                src={decodeBase64(item.hình)}
                                alt="Skincare Image"
                                style={{ border: "2px solid #b3e5fc" }}
                              />

                              {item.bounding.map((label, labelIndex) => (
                                <Box
                                  key={${index}-${labelIndex}}
                                  className="mt-3 "
                                >
                                  <Text
                                    onClick={() =>
                                      handleLabelClick(label.tên_Label)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      color: "#28a745",
                                      fontWeight: "bold",
                                      fontSize: "1.1em",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    <span style={{ marginRight: "5px" }}>
                                      <FontAwesomeIcon icon={faSquarePlus} />
                                    </span>{" "}
                                    {label.tên_Label}
                                  </Text>

                                  {selectedLabel === label.tên_Label && (
                                    <Box
                                      className="mt-2 p-2 rounded-lg shadow-xl"
                                      style={{ backgroundColor: "#F9F9F6" }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: "0.95em",
                                          color: "#343a40",
                                        }}
                                      >
                                        Count: {label.count}
                                      </Text>
                                      <Text
                                        style={{
                                          fontSize: "0.95em",
                                          color: "#343a40",
                                        }}
                                      >
                                        Suggestion: {label.suggestion}
                                      </Text>
                                    </Box>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </>
                  )}
                  <Divider
                    style={{ backgroundColor: "#dee2e6", marginTop: "1.5em" }}
                  />
                </Box>
              ))
            )}
          </>
        )}
      </Box>
    </Page>
  );
};

export default Records;
*/}