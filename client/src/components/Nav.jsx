import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import Profilephoto from "../assets/ProfilePhoto.png";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  return (
    <CustomContainer>
      <NavWrapper>
        <CustomFaBars />
        <Profile src={Profilephoto} />
        <Today>Today</Today>
        <CustomFaBell />
      </NavWrapper>
    </CustomContainer>
  );
};

export default Nav;

const CustomContainer = styled(Container)`
  height: 80px;
  max-width: 888px;
`;

const NavWrapper = styled.div`
  display: flex;
  color: var(--primaryShaded);
  justify-content: flex-end;
  padding-top: 22px;

  @media (max-width: 767.99px) {
    justify-content: space-between;
  }
`;

const CustomFaBell = styled(FaBell)`
  width: 28px;
  height: 37px;

  @media (max-width: 767.99px) {
    display: block;
    justify-content: flex-end;
  }
`;

const Profile = styled.img`
  padding-right: 36px;

  @media (max-width: 767.99px) {
    display: none;
  }
`;

const Today = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: var(--primaryShaded);
  display: none;

  @media (max-width: 767.99px) {
    display: block;
  }
`;

const CustomFaBars = styled(FaBars)`
  width: 21px;
  height: 28px;
  color: var(--primaryShaded);
  display: none;

  @media (max-width: 767.99px) {
    display: block;
    justify-content: flex-start;
  }
`;
