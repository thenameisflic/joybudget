import React from "react";
import styled from "styled-components";
import illustrationSavings from "../../assets/illustration-savings.svg";
import { Button } from "react-bootstrap";

export default function Intro({ onContinue }) {
  return (
    <>
      <h1 className="serif text-center mt-4">Budgeting for busy people</h1>
      <Illustration src={illustrationSavings} />
      <p className="lead serif text-center mt-4">
        Budgeting is the single best thing you can do for your pocket.
      </p>
      <p className="lead serif text-center">We make it simple and free.</p>
      <div className="flex-grow-1" />
      <Button variant="primary" block className="mb-4" onClick={onContinue}>
        Get started
      </Button>
    </>
  );
}

const Illustration = styled.img`
  max-width: 100%;
  margin-top: -2.5rem;
`;
