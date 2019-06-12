import React from "react";
import styled from "styled-components";
import Spending from "./Spending";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";
import {
  monthlySpending,
  weeklySpending,
  dailySpending,
  expensesBreakdown
} from "../store/selectors";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
`;

const colors = ["#ffda79", "#33d9b2", "#34ace0"];

function Home({
  monthlySpending,
  weeklySpending,
  dailySpending,
  expensesBreakdown
}) {
  const { t } = useTranslation();
  return (
    <Container>
      <h2 className="serif">{t("budgetSummary")}</h2>
      <Spending
        className="mt-4"
        title={t("monthlySpending")}
        current={monthlySpending.current}
        max={monthlySpending.max - monthlySpending.recurrent}
      />
      <Spending
        className="mt-2"
        title={t("weeklySpending")}
        current={weeklySpending.current}
        max={weeklySpending.max}
      />
      <Spending
        className="mt-2"
        title={t("dailySpending")}
        current={dailySpending.current}
        max={dailySpending.max}
      />
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          *{" "}
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={expensesBreakdown}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Legend
            payload={expensesBreakdown.map((item, idx) => ({
              id: item.name,
              type: "circle",
              color: colors[idx],
              value: `${item.name} (${(item.value / monthlySpending.current * 100).toFixed(1)}%)`
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

const mapStateToProps = state => ({
  monthlySpending: monthlySpending(state),
  weeklySpending: weeklySpending(state),
  dailySpending: dailySpending(state),
  expensesBreakdown: expensesBreakdown(state)
});

export default connect(mapStateToProps)(Home);
