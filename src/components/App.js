import React, { Suspense, useState } from "react";
import Home from "./Home";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import DailyTracker from "./DailyTracker";
import Income from "./Income";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import AddExpenseModal from "./AddExpenseModal";
import store, { persistor } from "../store";
import Tutorial from "./Tutorial/Tutorial";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isTutorialFinished, setTutorialFinished] = useState(
    localStorage.getItem("isTutorialFinished") === "true"
  );

  const onTutorialComplete = () => {
    localStorage.setItem("isTutorialFinished", "true");
    setTutorialFinished(true);
  }

  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<p>Loading...</p>}>
            {!isTutorialFinished && <Tutorial onComplete={onTutorialComplete} />}
            {isTutorialFinished && (
              <AppContainer>
                <HeaderContainer>
                  <HeaderTitle className="serif text-white">
                    Your Budget
                  </HeaderTitle>
                  <Button variant="outline-light" size="sm" onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}>Clear data &times;</Button>
                </HeaderContainer>
                <ContentContainer>
                  <Route exact path="/" component={Home} />
                  <Route path="/tracker" component={DailyTracker} />
                  <Route path="/expenses" component={Income} />
                </ContentContainer>
                <TabsContainer>
                  <AddExpenseButton onClick={() => setShowModal(true)}>
                    Add new expense
                  </AddExpenseButton>
                  <Tabs>
                    <Tab exact to="/">
                      Home
                    </Tab>
                    <Tab to="/tracker">Tracker</Tab>
                    <Tab to="/expenses">Income</Tab>
                  </Tabs>
                </TabsContainer>
                <AddExpenseModal
                  show={showModal}
                  onHide={() => {
                    setShowModal(false);
                  }}
                />
              </AppContainer>
            )}
          </Suspense>
        </PersistGate>
      </Provider>
    </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 920px;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 1024px) {
    box-shadow: 12px 0 15px -4px #a9a9a9cc, -12px 0 8px -4px #a9a9a9cc;
  }
`;

const HeaderContainer = styled.header`
  background-color: #706fd3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const HeaderTitle = styled.h5`
  margin-bottom: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  height: calc(100% - 60px);
  overflow-y: scroll;
  background-color: #fff;
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

export default App;
