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

import Signup from "./views/Signup";
import Onboarding from "./views/Onboarding";
import Overlay from "./components/Overlay";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [setAuth]);

  return (
    <>
      <GlobalStyle />
      <Switch>
        {auth && (
          <Route exact path="/">
            <Overlay showModal={showModal} setShowModal={setShowModal} />
            <Wrapper>
              <Sidebar showSidebar={showSidebar} />
              <Main lg={9}>
                <Nav
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
                <Today showModal={showModal} setShowModal={setShowModal} />
              </Main>
            </Wrapper>
          </Route>
        )}
        <Route exact path="/">
          <Onboarding />
        </Route>
        <Route path="/login">
          <Login />
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
`;

const Main = styled(Col)`
  background-color: var(--background);
  padding-left: 0;
  padding-right: 0;
  display: flex;
  flex-direction: column;
`;
