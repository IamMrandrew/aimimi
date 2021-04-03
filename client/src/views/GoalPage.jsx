import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Goals from "./Goals";

const GoalPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Wrapper>
      <Sidebar showSidebar={showSidebar} />
      <Main lg={9}>
        <Nav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Goals />
      </Main>
    </Wrapper>
  );
};

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

export default GoalPage;
