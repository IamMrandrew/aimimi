import React, { useState, useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { GlobalStyle } from "./components/GlobalStyle";
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Login from "./views/Login";
import Today from "./views/Today";

import Goals from "./views/Goals";
import Signup from "./views/Signup";
import Onboarding from "./views/Onboarding";
import Overlay from "./components/Overlay";
import Details from "./components/Details";
import Shares from "./views/Shares";
import Profile from "./views/Profile";
import Activity from "./views/Activity";
import Leaderboard from "./views/Leaderboard";
import Loader from "./components/Loader";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [goals, setGoals] = useState([]);
  const [userSharedGoals, setUserSharedGoals] = useState([]);

  const { auth, setAuth, setPropic } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
        axios
          .get(`/user/propic/`, { withCredentials: true })
          .then((response) => {
            setPropic(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  }, [setAuth, setPropic, loading]);

  useEffect(() => {
    axios
      .get("/goal", { withCredentials: true })
      .then((response) => {
        setGoals(response.data);
        setUserSharedGoals(
          response.data.filter((goal) => goal.publicity === true)
        );
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [auth]);

  return (
    <>
      <GlobalStyle />
      <Switch>
        {!loading && auth && (
          <>
            <Overlay showModal={showModal} setShowModal={setShowModal} />
            <Wrapper>
              <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                userSharedGoals={userSharedGoals}
              />
              <Main lg={9}>
                <Nav
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
                <Route exact path="/">
                  <Today
                    showModal={showModal}
                    setShowModal={setShowModal}
                    goals={goals}
                    setGoals={setGoals}
                  />
                </Route>
                <Route exact path="/goals">
                  <Goals goals={goals} setGoals={setGoals} />
                </Route>
                <Route path="/goals/:id">
                  <Details goals={goals} setGoals={setGoals} />
                </Route>
                <Route path="/shares">
                  <Shares />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/activity">
                  <Activity />
                </Route>
                <Route path="/leaderboard/:id">
                  <Leaderboard userSharedGoals={userSharedGoals} />
                </Route>
              </Main>
            </Wrapper>
          </>
        )}
        {loading && <Loader />}
        <Route exact path="/">
          <Onboarding />
        </Route>
        <Route path="/login">
          <Login setLoading={setLoading} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/onboarding">
          <Onboarding />
        </Route>
      </Switch>
    </>
  );
};

export default App;

const Wrapper = styled(Row)`
  height: 100vh;
  width: 100%;
  background-color: white;
  overflow: hidden;
`;

const Main = styled(Col)`
  background-color: var(--background);
  padding-left: 0;
  padding-right: 0;
  display: flex;
  flex-direction: column;
`;
