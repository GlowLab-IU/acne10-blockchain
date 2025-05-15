import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, Button, Typography, Space, Result } from "antd";
import { Box, Header, Page, useNavigate } from "zmp-ui";
import { Divider } from "../components/divider";
import style from "../css/app.scss";
import { useRecoilValue } from "recoil";

import { userState } from "../state";

const { Title } = Typography;

type QuestionOption = {
  label: string;
  value: string;
};

type Question = {
  title: string;
  name: string;
  options: QuestionOption[];
};

type FormData = {
  skinType?: string;
  sensitiveSkin?: string;
  irritated?: string;
  allergyHistory?: string;
  previousTreatment?: string;
  localizedAcne?: string;
  pregnant?: string;
  breastfeeding?: string;
};

const Survey: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const userInfo = useRecoilValue(userState);

  const [step, setStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<FormData>({}); // New state to store form data progressively

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Add the current step's answer to surveyData
    setSurveyData((prevData) => ({
      ...prevData,
      [questions[step].name]: Object.values(data)[0],
    }));

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSurveySubmit = async () => {
    try {
      navigate("/index");
    } catch (error) {
      console.error("Error submitting survey data:", error);
    }
  };

  const questions: Question[] = [
    {
      title: "Is your skin oily or combination-oily?",
      name: "skinType",
      options: [
        { label: "Oily skin", value: "oil" },
        { label: "Combination-oily", value: "combination_oily" },
      ],
    },
    {
      title: "Is your skin sensitive?",
      name: "sensitiveSkin",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      title: "Is your skin irritated (red, itchy)?",
      name: "irritated",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      title:
        "Is there a history of allergic reactions or irritation to topical medications?",
      name: "allergyHistory",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      title: "Have you ever used acne treatment before?",
      name: "previousTreatment",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      title:
        "Is your acne concentrated in specific areas such as under the jaw?",
      name: "localizedAcne",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      title: "Are you currently pregnant?",
      name: "pregnant",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      title: "Are you currently breastfeeding?",
      name: "breastfeeding",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ];

  const images: string[] = [
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972240/number1_npzqsh.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972240/number2_rctnxf.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972309/number3_ksqs4b.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972241/number4_ssopoi.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972241/number5_bdb9le.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972240/number6_vstqsq.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972240/number7_kxij6y.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972240/number8_zapo3g.png",
    "https://res.cloudinary.com/dwljkfseh/image/upload/v1727972240/number9_khyum6.png",
  ];

  const progressPercentage = ((step + 1) / questions.length) * 100;

  return (
    <Page>
      <Header title="Acne Treatment Survey" showBackIcon={false} />
      <div
        style={{
          objectFit: "cover",
          alignItems: "center",
          justifyItems: "center",
          display: "grid",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730652724/rb_2148089200_nj1fp9.png"
          alt="Centered Image"
          style={{
            width: "80%",
            objectFit: "cover",
            alignContent: "center",
          }}
        />
      </div>
      <Divider />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f0f2f5",
        }}
      >
        {!isCompleted ? (
          <>
            <div
              style={{
                width: "90%",
                margin: "1px auto 35px",
                backgroundColor: "rgb(225, 225, 225)",
                borderRadius: "8px",
                position: "relative",
                height: "30px",
              }}
              className="progress-bar"
            >
              <div
                className="progress-fill"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: `${progressPercentage}%`,
                  backgroundColor: "rgb(66, 72, 116)",
                  borderRadius: "20px",
                }}
              />
              {questions.map((_, index) => (
                <img
                  key={index}
                  className="progress-bar__icon"
                  src={images[index]}
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "0 5px",
                    opacity: index <= step ? 1 : 0.5,
                    position: "absolute",
                    left: `${(index / (questions.length - 1)) * 100}%`,
                    transform: "translateX(-50%)", // Căn giữa biểu tượng
                  }}
                />
              ))}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ textAlign: "center", width: "100%", maxWidth: "500px" }}
            >
              <Card
                style={{
                  marginBottom: 16,
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Title level={4} className="title">
                  {questions[step].title}
                </Title>
                <Space direction="vertical">
                  {questions[step].options.map((option) => (
                    <div
                      key={option.value}
                      className="option" // Áp dụng lớp CSS
                      style={{
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        padding: "10px",
                        width: "300px",
                        marginBottom: "10px",
                        transition: "background-color 0.3s",
                        backgroundColor:
                          errors[questions[step].name]?.type === "required" &&
                          errors[questions[step].name].message
                            ? "#ffcccc"
                            : "#ffffff",
                      }}
                      onClick={() => {
                        register(questions[step].name as keyof FormData, {
                          required: "Please select an answer",
                        });
                        onSubmit({ [questions[step].name]: option.value });
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                  {errors[questions[step].name] && (
                    <p style={{ color: "red" }}>
                      {errors[questions[step].name]?.message}
                    </p>
                  )}
                </Space>
              </Card>
            </form>
            <Button
              type="default"
              onClick={handlePrev}
              disabled={step === 0}
              style={{ marginBottom: 16 }}
            >
              Previous
            </Button>
          </>
        ) : (
          <Result
            status="success"
            title="Congratulations on completing the survey!"
            subTitle="Thank you for participating."
            extra={
              <Button type="primary" onClick={handleSurveySubmit}>
                Start
              </Button>
            }
          />
        )}
      </div>
    </Page>
  );
};
export default Survey;
