import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Login from "./views/Login";
import Today from "./views/Today";
import styled from "styled-components/macro";
import { GlobalStyle } from "./components/GlobalStyle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Signup from "./views/Signup";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Wrapper>
              <Sidebar showSidebar={showSidebar} />
              <Main lg={9}>
                <Nav
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
                <Today />
              </Main>
            </Wrapper>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
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
`;
