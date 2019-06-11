import React from "react";
import { ProgressBar } from "react-bootstrap";
import numeral from "numeral";

export default function Spending({max, current, title, className}) {
  const usage = current / max * 100;
  const overflow = usage - 100;
  return <div className={className}>
    <p className="mb-1">{title}</p>
    <ProgressBar>
      {overflow > 0 && <ProgressBar now={overflow} variant="danger" />}
      <ProgressBar now={usage} variant="warning" />
      {overflow <= 0 && <ProgressBar now={100 - usage} variant="primary" />}
    </ProgressBar>
    <p className="text-right mt-1 mb-0">{numeral(current).format("$0,0.00")} / {numeral(max).format("$0,0.00")}</p>
  </div>;
}
