import React, { FC, useEffect, useState } from "react";
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
import { firebaseConfig } from "../database/insert";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface SkincareData {
  userid: string;
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

  useEffect(() => {
    const fetchData = async () => {
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


  return (
    <Page>
      <Header title="History" />
      <Box
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1729323375/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2024-10-19_lu%CC%81c_14.33.11_s95och.png')",
          backgroundSize: "cover",
          height: "700px",
          padding: "16px",
          overflowY: "auto",
        }}
      >
        <div className="relative text-center py-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-lg shadow-2xl mb-6">
          <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase">
            <span className="drop-shadow-lg">History</span>
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-40"></div>
        </div>

        {[...groupedData.entries()].map(([dateKey, items]) => (
          <Box
            key={dateKey}
            className="info-container rounded-lg shadow-xl p-6 bg-gradient-to-b from-white to-blue-50 mb-4"
            style={{
              border: "1px solid #e0e7ff",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Text
              onClick={() => handleDateClick(dateKey)}
              style={{
                cursor: "pointer",
                color: "#1e40af",
                fontWeight: "bold",
                fontSize: "1.5em",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Align icon-text and caret
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://res.cloudinary.com/dwljkfseh/image/upload/v1733828894/10691802_ih4pqk.png"
                  alt="Icon"
                  style={{
                    marginRight: "8px",
                    width: "24px", // Slightly larger for better visibility
                    height: "24px",
                  }}
                />
                <span>{dateKey}</span>
              </div>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  transition: "transform 0.3s ease",
                }}
              >
                <FontAwesomeIcon icon={faSquareCaretDown} />
              </span>
            </Text>

            {selectedDate === dateKey && (
              <Box className="mt-4 space-y-4">
                {items.map((item, index) => (
                  <Box
                    key={index}
                    className="rounded-md shadow-md p-5 bg-white"
                    style={{
                      border: "1px solid #d1d5db",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Text
                      style={{
                        color: "#374151",
                        fontSize: "1.1em",
                        marginBottom: "12px",
                      }}
                    >
                      Detected at:{" "}
                      {item.ngày instanceof Date
                        ? item.ngày.toLocaleString()
                        : item.ngày.toDate().toLocaleString()}
                    </Text>

                    <img
                      className="w-full h-auto rounded-md shadow-md mb-4"
                      src={decodeBase64(item.hình)}
                      alt="Skincare Image"
                      style={{
                        border: "3px solid #93c5fd",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />

                    {item.bounding.map((label, labelIndex) => (
                      <Box
                        key={`${index}-${labelIndex}`}
                        className="mt-3 rounded-lg shadow-inner p-4"
                        style={{
                          backgroundColor: "#f3f4f6",
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        <Text
                          onClick={() => handleLabelClick(label.tên_Label)}
                          style={{
                            cursor: "pointer",
                            color: "#1e3a8a",
                            fontWeight: "bold",
                            fontSize: "1.2em",
                          }}
                        >
                          <span style={{ marginRight: "8px" }}>➕</span>{" "}
                          {label.tên_Label}
                        </Text>

                        {selectedLabel === label.tên_Label && (
                          <Box
                            className="mt-3 p-4 rounded-lg"
                            style={{
                              backgroundColor: "#e5e7eb",
                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            <Text style={{ fontSize: "1em", color: "#111827" }}>
                              Count: {label.count}
                            </Text>
                            <Text style={{ fontSize: "1em", color: "#111827" }}>
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

            <Divider
              style={{ backgroundColor: "#d1d5db", marginTop: "1.5em" }}
            />
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default Records;

