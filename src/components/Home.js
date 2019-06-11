import React from "react";
import styled from "styled-components";
import Spending from "./Spending";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import {
  monthlySpending,
  weeklySpending,
  dailySpending
} from "../store/selectors";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
`;

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];

function Home({ monthlySpending, weeklySpending, dailySpending }) {
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
            data={data01}
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

const mapStateToProps = state => ({
  monthlySpending: monthlySpending(state),
  weeklySpending: weeklySpending(state),
  dailySpending: dailySpending(state)
});

export default connect(mapStateToProps)(Home);
