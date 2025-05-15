import React, { FC, useState } from "react";

interface StepGuideProps {
  stepNumber: string;
  title: string;
  description: string;
  imageUrl: string;
}

const StepGuide: FC<StepGuideProps> = ({
  stepNumber,
  title,
  description,
  imageUrl,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundImage:
          "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1730746535/38137ea37d169cb7c3ad84e69d659875_qwi8ia.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        margin: "20px",
        position: "relative",
        overflow: "hidden",
        maxWidth: "90%",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        transform: isVisible ? "scale(1)" : "scale(0.98)",
      }}
      onClick={toggleVisibility}
    >
      {/* Step Number */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "-10px",
          left: "-10px",
          color: "#FFD700",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {stepNumber}
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt={`Step ${stepNumber}`}
        style={{
          width: "100%",
          maxWidth: "300px",
          borderRadius: "12px",
          objectFit: "cover",
          marginBottom: "16px",
          opacity: isVisible ? 1 : 0.7,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontSize: "22px",
          fontWeight: "700",
          fontFamily: "'Roboto', sans-serif",
          marginBottom: "12px",
          color: isVisible ? "#000" : "#FFD700",
          transition: "color 0.3s ease",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {isVisible && (
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            fontFamily: "Arial, sans-serif",
            color: "#000",
            maxWidth: "90%",
            marginTop: "12px",
          }}
        >
          {description}
        </p>
      )}

      {/* Button for More Details */}
      <button
        style={{
          marginTop: "12px",
          padding: "10px 20px",
          backgroundColor: isVisible ? "#FFD700" : "#1E90FF",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {isVisible ? "Hide Details" : "View Details"}
      </button>
    </div>
  );
};

export default StepGuide;
