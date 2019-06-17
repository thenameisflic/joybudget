import React from "react";
import styled from "styled-components";
import illustrationSavings from "../../assets/illustration-savings.svg";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Intro({ onContinue }) {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="serif text-center mt-4">{t("appSlogan")}</h1>
      <Illustration src={illustrationSavings} />
      <TutorialStep0Info className="lead serif text-center mt-4">
        {t("tutorialStep0Info")}
      </TutorialStep0Info>
      <div className="flex-grow-1" />
      <Button variant="primary" block className="mb-4" onClick={onContinue}>
        {t("getStarted")}
      </Button>
    </>
  );
}

const Illustration = styled.img`
  max-width: 100%;
  margin-top: -2.5rem;
`;

const TutorialStep0Info = styled.p`
  white-space: pre-wrap;
`;
