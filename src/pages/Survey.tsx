import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Typography, Button, Result, Space } from "antd";
import { Page, Header, useNavigate } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { Divider } from "../components/divider";

const { Title } = Typography;

type QuestionOption = {
  label: string;
  value: string;
};

type Question = {
  title: string;
  name: keyof FormData;
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

const Survey = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { setValue, handleSubmit } = useForm<FormData>();

  const [step, setStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<FormData>({});

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

  const currentQuestion = questions[step];

  const handleAnswerSelect = (value: string) => {
    const name = currentQuestion.name;
    setAnswers((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSurveySubmit = () => {
    // TODO: handle real submission
    console.log("Survey completed:", answers);
    navigate("/homepage");
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <Page>
      <Header title="Acne Survey" showBackIcon={false} />
      <div style={{ textAlign: "center", padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <img
            src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730652724/rb_2148089200_nj1fp9.png"
            alt="Survey"
            style={{ width: "80%", maxWidth: "300px" }}
          />
        </div>
        <Divider />
        {!isCompleted ? (
          <>
            <div
              style={{
                background: "#f0f2f5",
                borderRadius: "8px",
                marginBottom: "16px",
                padding: "4px 0",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "6px",
                  backgroundColor: "#1677ff",
                  borderRadius: "6px",
                  transition: "width 0.3s",
                }}
              />
            </div>

            <Card style={{ margin: "auto", maxWidth: 480 }}>
              <Title level={4}>{currentQuestion.title}</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                {currentQuestion.options.map((opt) => (
                  <Button
                    key={opt.value}
                    type={
                      answers[currentQuestion.name] === opt.value
                        ? "primary"
                        : "default"
                    }
                    block
                    onClick={() => handleAnswerSelect(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </Space>
            </Card>

            <Button
              type="default"
              onClick={handlePrev}
              disabled={step === 0}
              style={{ marginTop: 16 }}
            >
              Previous
            </Button>
          </>
        ) : (
          <Result
            status="success"
            title="Survey Completed!"
            subTitle="Thank you for helping us understand your skin better."
            extra={
              <Button type="primary" onClick={handleSurveySubmit}>
                Go to Home
              </Button>
            }
          />
        )}
      </div>
    </Page>
  );
};

export default Survey;
