import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import Profilephoto from "../assets/ProfilePhoto.png";

const Nav = () => {
  return (
    <CustomContainer>
      <NavWrapper>
        {/* <img src={Profilephoto} alt="Profile" /> */}
        <Profile src={Profilephoto} />
        <CustomFaBell />
      </NavWrapper>
    </CustomContainer>
  );
};

export default Nav;

const CustomContainer = styled(Container)``;
const NavWrapper = styled.div`
  display: flex;
  color: var(--primaryShaded);
  justify-content: flex-end;
  padding-right: 103px;
  padding-top: 22px;
`;
const CustomFaBell = styled(FaBell)`
  width: 28px;
  height: 37px;
`;

const Profile = styled.img`
  padding-right: 36px;
`;
