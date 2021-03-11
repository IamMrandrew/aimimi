import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components/macro";
import { FaBell } from "react-icons/fa";
import Profilephoto from "../assets/ProfilePhoto.png";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  return (
    <NavContainer>
      <CustomFaBars />
      <Profile src={Profilephoto} />
      <Today>Today</Today>
      <CustomFaBell />
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled(Container)`
  height: 80px;
  max-width: 888px;

  @media (max-width: 991.98px) {
    /* 767.99*/
    height: 60px;
  }
  display: flex;
  color: var(--primaryShaded);
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 991.98px) {
    justify-content: space-between;
  }
`;
const CustomFaBell = styled(FaBell)`
  width: 28px;
  height: 37px;

  @media (max-width: 991.98px) {
    /* 767.99*/
    display: block;
    justify-content: flex-end;
  }
`;

const Profile = styled.img`
  padding-right: 36px;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const Today = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: var(--primaryShaded);
  display: none;

  @media (max-width: 991.98px) {
    display: block;
  }
`;

const CustomFaBars = styled(FaBars)`
  width: 21px;
  height: 28px;
  color: var(--primaryShaded);
  display: none;

  @media (max-width: 991.98px) {
    display: block;
    justify-content: flex-start;
  }
`;
