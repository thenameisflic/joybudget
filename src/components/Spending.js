import React from "react";
import { ProgressBar } from "react-bootstrap";
import numeral from "numeral";

export default function Spending({max, current, title, className}) {
  let red = 0;
  let yellow = 0;
  let blue = 0;
  let remainingBalance = max - current;
  if (remainingBalance > 0) {
    yellow = current / max * 100;
    blue = remainingBalance / max * 100;
  } else {
    if (max <= 0) {
      red = 100;
    } else {
      if (max * 2 - current <= 0)
        red = 100;
      else {
        red = current / (max * 2) * 100;
        yellow = (max * 2 - current) / (max * 2) * 100;
      }
    }
  }

  return <div className={className}>
    <p className="mb-1">{title}</p>
    <ProgressBar>
      <ProgressBar now={red} variant="danger" />
      <ProgressBar now={yellow} variant="warning" />
      <ProgressBar now={blue} variant="primary" />
    </ProgressBar>
    <p className="text-right mt-1 mb-0">{numeral(current).format("$0,0.00")}{ max > 0 ? " / " +numeral(max).format("$0,0.00") : ""}</p>
  </div>;
}
