import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import { GlobalStyle } from "./components/GlobalStyle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Login = () => {
  return (
    <GlobalStyle>
      <Wrapper>
        test
        <Main />
      </Wrapper>
    </GlobalStyle>
  );
};

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
export default Login;
