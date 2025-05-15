import React, { FC, useState } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "../components/divider";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const Statistics: FC = () => {
  const [seriesNb, setSeriesNb] = useState(2);
  const [itemNb, setItemNb] = useState(5);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const handleItemNbChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setItemNb(newValue);
    }
  };

  const handleSeriesNbChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSeriesNb(newValue);
    }
  };

  const series = [
    {
      label: "Papule",
      data: [10, 8, 5, 7, 8, 7, 5, 4, 6, 5, 3, 1],
    },
    {
      label: "Acne",
      data: [7, 6, 6, 5, 7, 4, 7, 5, 6, 4, 3, 1],
    },
  ];

  return (
    <Page>
      <Header title="Statistic" />

      {/* Banner Image */}
      <Box style={{ textAlign: "center" }}>
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1727092228/analyze_s7sip3.png"
          alt="Banner"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      <Box>
        <div
          className="relative flex justify-center items-center text-center py-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-lg shadow-2xl mb-6"
          style={{ width: "95%", height: "auto", margin: "0 auto" }}
        >
          <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase">
            <span className="drop-shadow-lg">dashboard</span>
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-40"></div>
        </div>
        <Divider />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Gauge
            value={80}
            valueMax={120}
            startAngle={-90}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            sx={{
              width: "100px",
              height: "100px",
              color: "green",
            }}
          />
          <Text
            style={{
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Work Progress
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Gauge
            value={20}
            valueMax={30}
            startAngle={-110}
            endAngle={110}
            sx={{
              width: "130px",
              height: "150px",
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 20,
                transform: "translate(0px, 0px)",
              },
              [`& .${gaugeClasses.arc}`]: {
                stroke: "green",
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
          <Text
            style={{
              fontSize: "14px",
              textAlign: "center",
              paddingBottom: "45px",
            }}
          >
            Days
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Gauge
            value={60}
            valueMax={120}
            startAngle={-90}
            endAngle={360}
            innerRadius="80%"
            outerRadius="100%"
            sx={{
              width: "100px",
              height: "100px",
              color: "green",
            }}
          />
          <Text
            style={{
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Effectiveness
          </Text>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <BarChart
          height={300}
          series={series.slice(0, seriesNb).map((s, index) => ({
            ...s,
            data: s.data.slice(0, itemNb),
            color: index % 2 === 0 ? "#0047AB" : "#FF8C00", // Chọn màu sắc cho từng chuỗi
          }))}
          skipAnimation={skipAnimation}
          axes={[
            {
              id: "x-axis",
              label: "Day",
            },
            {
              id: "y-axis",
              label: "Number",
            },
          ]}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={skipAnimation}
              onChange={(event) => setSkipAnimation(event.target.checked)}
            />
          }
          label="Skip Animation"
        />
        <Typography id="input-item-number" gutterBottom>
          Number of Days
        </Typography>
        <Slider
          value={itemNb}
          onChange={handleItemNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={20}
          aria-labelledby="input-item-number"
        />
        <Typography id="input-series-number" gutterBottom>
          Number of types
        </Typography>
        <Slider
          value={seriesNb}
          onChange={handleSeriesNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          aria-labelledby="input-series-number"
        />
      </Box>
    </Page>
  );
};

export default Statistics;
