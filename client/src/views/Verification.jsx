import React from "react";
import styled from "styled-components/macro";
import Row from "react-bootstrap/Row";
import logo from "../assets/Logo.svg";
import Verify from "../assets/verification.png";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useHistory, Link } from "react-router-dom";

const Verification = () => {
  const history = useHistory();

  // If user clicked the login button then will route to login page
  const onClickHandler = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  // If user click the logo, then it will route back to onboarding page
  const onClickLogo = (e) => {
    e.preventDefault();
    history.push("/onboarding");
  };
  return (
    <Wrapper>
      <CustomContainer>
        <CustomNavbar>
          <Navbar.Brand onClick={onClickLogo}>
            <Logo src={logo} />
            <Brand>aimimi</Brand>
          </Navbar.Brand>
        </CustomNavbar>
        <CenterDiv>
          <BlockDiv>
            <ImgDiv src={Verify} />
            <Title>Verify your email </Title>
            <Subtitle>Hi! We have sent a verification email and start</Subtitle>
            <Subtitle> enjoying Aimimi.</Subtitle>
            <LoginBar onClick={onClickHandler}>
              <LoginTitle>Login</LoginTitle>
            </LoginBar>
          </BlockDiv>
        </CenterDiv>
      </CustomContainer>
    </Wrapper>
  );
};

export default Verification;
const Wrapper = styled(Row)`
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const Logo = styled.img`
  margin-right: 20px;
  width: 32px;
  height: 32px; ;
`;

const Brand = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: #000000;
  margin-top: 10px;
`;

const CustomContainer = styled(Container)`
  position: relative;
`;

const CustomNavbar = styled(Navbar)`
  padding-top: 20px;

  .navbar-brand {
    display: flex;
    align-items: center;
  }
`;

const CenterDiv = styled.div`
  height: 84vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.img`
  height: 377px;
  width: 377px;

  @media (max-width: 768px) {
    height: 300px;
    width: 300px;
  }
`;

const Title = styled.h1`
  font-family: "Roboto";
  font-size: 38px;
  font-weight: 700;
  color: #000000;

  margin-bottom: 7px;
`;

const Subtitle = styled.h2`
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 400;
  color: #6e7191;
  margin-bottom: 11px;
`;
const LoginBar = styled.button`
  margin-top: 46px;
  width: 100%;
  border-radius: 20px;
  background-color: var(--primary);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  display: block;

  @media (max-width: 767.98px) {
    height: 70px;
  }
`;

const LoginTitle = styled.h1`
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 700;
  color: white;

  @media (max-width: 767.98px) {
    font-size: 16px;
  }
`;
const BlockDiv = styled.div`
  padding: 0px 27px;
`;
