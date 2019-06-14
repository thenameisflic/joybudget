import React, { useState } from "react";
import styled from "styled-components";
import Spending from "./Spending";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";
import {
  monthlySpending,
  weeklySpending,
  dailySpending,
  expensesBreakdown
} from "../store/selectors";
import numeral from "numeral";
import { CHART_COLORS } from "../constants";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  parse,
  isAfter,
  isBefore,
  subDays,
  subWeeks,
  subMonths
} from "date-fns";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
`;

const ChartHeader = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Home({
  monthlySpending,
  weeklySpending,
  dailySpending,
  expensesBreakdown
}) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeTitle, setDateRangeTitle] = useState("Today");

  const getFilteredExpenses = breakdown => {
    const inRange = ({ at }) => {
      const d = parse(at);
      return (
        (isSameDay(d, startDate) || isAfter(d, startDate)) &&
        (isSameDay(d, endDate) || isBefore(d, endDate))
      );
    };
    const b = breakdown.map(item => {
      return {
        ...item,
        value: Math.abs(
          item.expenses.filter(inRange).reduce((acc, e) => acc + e.value, 0)
        ),
        expenses: item.expenses.filter(inRange)
      };
    });
    return { expenses: b, total: b.reduce((acc, { value }) => acc + value, 0) };
  };

  const updateDateRange = (start, end, evt) => {
    if (evt) {
      evt.preventDefault();
      setDateRangeTitle(evt.target.innerText);
    }
    setStartDate(start);
    setEndDate(end);
  };

  const today = new Date();
  const yesterday = subDays(today, 1);
  const startOfThisWeek = startOfWeek(today);
  const startOfPreviousWeek = startOfWeek(subWeeks(today, 1));
  const endOfPreviousWeek = endOfWeek(startOfPreviousWeek);
  const startOfThisMonth = startOfMonth(today);
  const startOfPreviousMonth = startOfMonth(subMonths(today, 1));
  const endOfPreviousMonth = endOfMonth(startOfPreviousMonth);

  const filtered = getFilteredExpenses(expensesBreakdown);
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
      <ChartHeader>
        <div>What you spent money on</div>
        <div>
          <DropdownButton
            id="chart-period-selector"
            variant="link"
            title={dateRangeTitle}
          >
            <Dropdown.Item
              href="#"
              onClick={e => updateDateRange(today, today, e)}
            >
              Today
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={e => updateDateRange(yesterday, yesterday, e)}
            >
              Yesterday
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={e => updateDateRange(startOfThisWeek, today, e)}
            >
              This week
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={e => updateDateRange(startOfThisMonth, today, e)}
            >
              This month
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={e =>
                updateDateRange(startOfPreviousWeek, endOfPreviousWeek, e)
              }
            >
              Last week
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={e =>
                updateDateRange(startOfPreviousMonth, endOfPreviousMonth, e)
              }
            >
              Last month
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </ChartHeader>
      {filtered.total === 0 && <p className="text-center d-flex align-items-center justify-content-center" style={{height: "350px"}}>You don't have any expenses for this period.</p>}
      {filtered.total !== 0 && <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={filtered.expenses}
              outerRadius={80}
              fill="#8884d8"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                console.log("handling label?");
                const RADIAN = Math.PI / 180;
                // eslint-disable-next-line
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                // eslint-disable-next-line
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                // eslint-disable-next-line
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
                return (
                  <text
                    x={x}
                    y={y}
                    fill={filtered.expenses[index].fill}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {numeral(value).format("$0,0.00")}
                  </text>
                );
              }}
            />
            <Legend
              payload={filtered.expenses.map(
                (item, idx) => ({
                  id: item.name,
                  type: "circle",
                  color: CHART_COLORS[idx],
                  value: `${item.name} (${(
                    (item.value /
                      filtered.total) *
                    100
                  ).toFixed(1)}%)`
                })
              )}
            />
          </PieChart>
      </ResponsiveContainer>}
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
