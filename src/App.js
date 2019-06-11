import React, { Suspense, useState } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import DailyTracker from "./DailyTracker";
import Expenses from "./Expenses";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import AddExpenseModal from "./AddExpenseModal";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  justify-content: space-around;
  height: 100px;
  background-color: var(--light);
`;

const Tabs = styled.div`
  display: flex;
  height: 60px;
`;

const Tab = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: var(--gray);
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:hover {
    text-decoration: none;
  }

  &.active {
    font-weight: bold;
    color: var(--blue);
    text-decoration: none;
  }
`;

const AddExpenseButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #fff;
  border-radius: 0;
`;

function App() {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <Router>
      <AppContainer>
        <Suspense fallback={<p>Loading...</p>}>
          <ContentContainer>
            <Route exact path="/" component={Home} />
            <Route path="/tracker" component={DailyTracker} />
            <Route path="/expenses" component={Expenses} />
          </ContentContainer>
          <TabsContainer>
            <AddExpenseButton onClick={() => setShowModal(true)}>Add new expense</AddExpenseButton>
            <Tabs>
              <Tab exact to="/">
                Home
              </Tab>
              <Tab to="/tracker">Tracker</Tab>
              <Tab to="/expenses">Expenses</Tab>
            </Tabs>
          </TabsContainer>
          <AddExpenseModal show={showModal} onHide={() => setShowModal(false)} />
        </Suspense>
      </AppContainer>
    </Router>
  );
}

export default App;
