import React, { useState, useEffect} from "react";
import styled from "styled-components";
import preparingCharts from "../../assets/preparing-charts.svg";

const TOTAL_DURATION = 5000;

export default function Loading({onContinue}) {
  const [ tip, setTip ] = useState("Analyzing your expenses...");

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setTip("Almost there...");
    }, TOTAL_DURATION / 2)
    const timeout2 = setTimeout(() => {
      onContinue();
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onContinue]);

  return (
    <>
      <p className="lead serif mt-4 text-center">Great, that's all we needed!</p>
      <div className="flex-grow-1"></div>
      <Illustration src={preparingCharts} />
      <div className="flex-grow-1"></div>
      <div className="d-flex justify-content-center mt-2">
        <Spinner />
      </div>
      <p className="lead serif mt-2 mb-4 text-center">{tip}</p>
    </>
  );
}

const Illustration = styled.img`
  max-width: 100%;
`;

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="5"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
