import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/Logo.svg";
import Onboarding1 from "../assets/Onboarding_1.png";
import Onboarding2 from "../assets/Onboarding_2.png";
import Onboarding3 from "../assets/Onboarding_3.png";
import { Link } from "react-router-dom";

//Onboarding page
const Onboarding = () => {
  return (
    <Wrapper data-testid="onboardingComponent">
      <CustomNavbar expand="lg">
        <CustomContainer>
          <Navbar.Brand>
            <Logo src={logo} />
            <Brand>aimimi</Brand>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <CustomNav>
              <NavButton filled="true">
                <NavLink to="/signup"> Signup</NavLink>
              </NavButton>
              <NavButton>
                <NavLink to="/login">Log in</NavLink>
              </NavButton>
            </CustomNav>
          </Navbar.Collapse>
        </CustomContainer>
      </CustomNavbar>
      <Hero>
        <CustomContainer>
          <FlexWrapper>
            <ContentWrapper>
              <SloganWrapper>
                <Slogan>A goal sharing web application</Slogan>
                <Button to="/signup">Get Started</Button>
              </SloganWrapper>
            </ContentWrapper>
            <ImgWrapper>
              <OnboardingImg1 src={Onboarding1} />
            </ImgWrapper>
          </FlexWrapper>
        </CustomContainer>
      </Hero>
      <Intro>
        <CustomContainer>
          <FloatImgWrapper>
            <Onboarding1Mobile src={Onboarding1} />
          </FloatImgWrapper>
          <FlexWrapper>
            <ImgWrapper>
              <OnboardingImg2 src={Onboarding2} />
            </ImgWrapper>
            <ContentWrapper>
              <TextWrapper>
                <Title>Why choose us?</Title>
                <Para>
                  The project’s objective is to develop a platform for people
                  who are hoping to crush their goals. Our app aims to rise
                  users' motivation to the fullest by taking reference of social
                  media.
                </Para>
                <Para>
                  The core feature of the platform is goal tracking, also with
                  some other features like goal sharing, leaderboard, social
                  networking service, etc.
                </Para>
              </TextWrapper>
            </ContentWrapper>
          </FlexWrapper>
          <FlexWrapper>
            <ContentWrapper2>
              <TextWrapper>
                <Title>Shared Goal</Title>
                <Para>
                  aimimi introduced shared goals for our users. User explore
                  goal in shares and feel free to challenge themselves. Users
                  can participate other's goal once it is set as public.
                </Para>
                <Para>
                  With the features of Leaderboard an Activity, Users can be
                  motivated through the encouragement and a sense of competition
                  from others
                </Para>
              </TextWrapper>
            </ContentWrapper2>
            <ImgWrapper>
              <OnboardingImg2 src={Onboarding3} />
            </ImgWrapper>
          </FlexWrapper>
        </CustomContainer>
      </Intro>
    </Wrapper>
  );
};

export default Onboarding;

const Wrapper = styled.div``;
const CustomContainer = styled(Container)`
  position: relative;
`;

// Navbar

const CustomNavbar = styled(Navbar)`
  background-color: var(--primary);
  padding-top: 20px;

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .navbar-toggler {
    color: white;
    border: none;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='square' stroke-miterlimit='10' stroke-width='3' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
`;

const Logo = styled.img`
  margin-right: 20px;
  width: 32px;
  height: 32px;
`;

const Brand = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: white;
`;

const CustomNav = styled(Nav)`
  margin-left: auto;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  color: white;

  :hover {
    text-decoration: none;
    color: white;
  }
`;

const NavButton = styled.div`
  appearance: none;
  background: ${(props) => (props.filled ? "var(--primaryShaded)" : "none")};
  border: ${(props) => (props.filled ? "none" : "2px solid white")};
  padding: 6px 30px;
  border-radius: 20px;
  margin-left: 15px;
  text-align: right;
  cursor: pointer;

  @media (max-width: 991.98px) {
    background: none;
    border: none;
  }
`;

// Hero Section

const Hero = styled.section`
  background-color: var(--primary);

  @media (max-width: 991.98px) {
    padding-bottom: 80px;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

const ContentWrapper = styled.div`
  flex-basis: 50%;
  display: flex;
  align-items: center;
  min-height: 350px;

  @media (max-width: 991.98px) {
    flex-basis: 100%;
  }
`;

const ContentWrapper2 = styled.div`
  flex-basis: 50%;
  display: flex;
  align-items: center;

  @media (max-width: 991.98px) {
    flex-basis: 100%;
  }
`;

const ImgWrapper = styled.div`
  flex-basis: 50%;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const SloganWrapper = styled.div`
  max-width: 350px;
`;

const TextWrapper = styled.div``;

const Slogan = styled.h1`
  color: white;
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 40px;

  @media (max-width: 991.98px) {
    font-size: 28px;
  }
`;

const Button = styled(Link)`
  display: block;
  appearance: none;
  background: var(--primaryShaded);
  color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 10px;
  width: 160px;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;

  :hover {
    text-decoration: none;
    color: white;
  }
`;

const OnboardingImg1 = styled.img`
  width: 100%;
  position: relative;
  top: 120px;
`;

// Intro Section

const Intro = styled.section`
  padding-top: 50px;

  @media (max-width: 991.98px) {
    padding-top: 100px;
  }
`;

const FloatImgWrapper = styled.div`
  display: none;

  @media (max-width: 991.98px) {
    position: absolute;
    display: flex;
    justify-content: center;
    top: -260px;
    left: 0;
    right: 0;
  }
`;
const Onboarding1Mobile = styled.img`
  width: 320px;
  height: 320px;
`;

const OnboardingImg2 = styled.img``;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Para = styled.p``;
