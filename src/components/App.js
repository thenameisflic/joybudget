import React, { Suspense, useState } from "react";
import Home from "./Home";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import DailyTracker from "./DailyTracker";
import Income from "./Income";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import AddExpenseModal from "./AddExpenseModal";
import store, { persistor } from "../store";
import Tutorial from "./Tutorial/Tutorial";
import SettingsButton from "./Settings";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [onboardStep, setOnboardStep] = useState(
    localStorage.getItem("onboardStep") || 0
  );

  const [isTutorialFinished, setTutorialFinished] = useState(
    localStorage.getItem("isTutorialFinished") === "true"
  );

  const onTutorialComplete = () => {
    localStorage.setItem("isTutorialFinished", "true");
    setTutorialFinished(true);
  };

  const onContinueOnboard = () => {
    localStorage.setItem("onboardStep", onboardStep + 1);
    setOnboardStep(onboardStep + 1);
  };

  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<p>Loading...</p>}>
            {!isTutorialFinished && (
              <Tutorial onComplete={onTutorialComplete} />
            )}
            {isTutorialFinished && (
              <AppContainer>
                <HeaderContainer>
                  <HeaderTitle className="serif text-white">
                    Your Budget
                  </HeaderTitle>
                  <SettingsButton />
                </HeaderContainer>
                <ContentContainer>
                  <Route
                    exact
                    path="/"
                    component={() => (
                      <Home
                        onboardStep={onboardStep}
                        onContinueOnboard={onContinueOnboard}
                      />
                    )}
                  />
                  <Route path="/tracker" component={DailyTracker} />
                  <Route path="/expenses" component={Income} />
                </ContentContainer>
                <TabsContainer>
                  {onboardStep === 1 && (
                    <OnboardHelp2
                      style={{ zIndex: onboardStep === 1 ? 1080 : 0 }}
                    >
                      <OnboardHelp2Title className="serif mt-4">
                        Whenever you buy something, use this button to add it to
                        your budget.
                      </OnboardHelp2Title>
                      <AddExpenseButton
                        block
                        onClick={() => {
                          onContinueOnboard();
                          setShowModal(true);
                        }}
                      >
                        Add new expense
                      </AddExpenseButton>
                      <Button
                        variant="link"
                        className="ml-auto mt-2 mr-2 d-block"
                        onClick={onContinueOnboard}
                      >
                        Got it
                      </Button>
                    </OnboardHelp2>
                  )}
                  <AddExpenseButton block onClick={() => setShowModal(true)}>
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
            <Modal show={onboardStep < 2 && isTutorialFinished} onHide={onContinueOnboard} />
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
  position: relative;

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
  position: relative;
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

  svg {
    fill: var(--gray);
  }

  &:focus,
  &:hover {
    text-decoration: none;
  }

  &.active {
    font-weight: bold;
    color: var(--blue);
    text-decoration: none;

    svg {
      fill: var(--blue);
    }
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

const OnboardHelp2 = styled.div`
  position: absolute;
  width: 100%;
  background: #fff;
  top: 0;
  bottom: 0;
`;

const OnboardHelp2Title = styled.h5`
  position: absolute;
  bottom: 100px;
  background-color: #fff;
  margin: 0;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
`;

export default App;
