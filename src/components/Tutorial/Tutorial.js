import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import logoText from "../../assets/logo-text.svg";
import Intro from "./Intro";
import SetupIncome from "./SetupIncome";
import SetupExpensesVisibility from "./SetupExpensesVisibility";
import SetupExpensesValues from "./SetupExpensesValues";
import SetupSavings from "./SetupSavings";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";

export default function Tutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const steps = [
    Intro,
    SetupIncome,
    SetupExpensesVisibility,
    SetupExpensesValues,
    SetupSavings,
    Loading
  ];

  const Step = steps[currentStep];
  return (
    <TutorialContainer>
      <TutorialHeader>
        <Logo src={logoText} alt="Joybudget Logo" />
        {currentStep === 0 && (
          <Button variant="link" onClick={() => onComplete()}>
            {t("skipTutorial")}
          </Button>
        )}
        {currentStep !== 0 && (
          <Button
            variant="link"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            {t("back")}
          </Button>
        )}
      </TutorialHeader>
      <TutorialContent>
        <Step
          onContinue={() => {
            if (currentStep + 1 === steps.length) {
              onComplete();
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
        />
      </TutorialContent>
    </TutorialContainer>
  );
}

const TutorialContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 600px;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 1024px) {
    box-shadow: 12px 0 15px -4px #a9a9a9cc, -12px 0 8px -4px #a9a9a9cc;
  }
`;

const TutorialHeader = styled.header`
  height: 60px;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TutorialContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Logo = styled.img`
  height: 30px;
  width: auto;
`;
