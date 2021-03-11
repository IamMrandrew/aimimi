import React, { useState } from "react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Today from "./components/Today";
import styled from "styled-components/macro";
import { GlobalStyle } from "./components/GlobalStyle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Sidebar showSidebar={showSidebar} />
        <Main lg={9}>
          <Nav />
          <Today />
        </Main>
      </Wrapper>
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
  background-color: white;
  padding-left: 0;
  padding-right: 0;
`;
