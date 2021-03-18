import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styled, { css } from "styled-components/macro";
import { FaBell } from "react-icons/fa";
import Profilephoto from "../assets/ProfilePhoto.png";
import { FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../views/Login";
const Nav = ({ showSidebar, setShowSidebar }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const SideBarHandler = (showSidebar) => {
    setShowSidebar(!showSidebar);
  };
  const DropDownHandler = (showDropDown) => {
    setShowDropDown(!showDropDown);
  };

  return (
    <Wrapper>
      <NavContainer>
        <CustomFaBars onClick={() => SideBarHandler(showSidebar)} />
        <Profile src={Profilephoto} />
        <Today>Today</Today>
        <OutDropDown>
          <WrapDropDownWrapper>
            <DropDownWrapper>
              <UserName>Jane Doe</UserName>
              <CustomFaChevronDown
                onClick={() => DropDownHandler(showDropDown)}
              />
            </DropDownWrapper>

            <DownWrapper showDropDown={showDropDown}>
              <BlockWrapper>
                <ProfileWrapper>
                  <CustomFaUserAlt />
                  <DropDownText>Profile</DropDownText>
                </ProfileWrapper>
                <LogoutWrapper>
                  <CustomFaSignOutAlt />
                  <DropDownText to="/login">Logout</DropDownText>
                </LogoutWrapper>
              </BlockWrapper>
            </DownWrapper>
          </WrapDropDownWrapper>
        </OutDropDown>

        <BellWapper>
          <CustomFaBell />
        </BellWapper>
      </NavContainer>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.div`
  background-color: white;
`;

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
const BellWapper = styled.div`
  padding-left: 23px;
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

const DropDownWrapper = styled.div`
  background-color: #f2f4f6;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 800;
  color: var(--primaryShaded);
  margin-left: 18px;
  margin-right: 43px;
`;

const CustomFaChevronDown = styled(FaChevronDown)`
  color: var(--primaryShaded);
  width: 20px;
  height: 20px;
  margin-right: 14px;
`;

const DownWrapper = styled.div`
  background-color: #f2f4f6;
  border-radius: 16px;
  position: absolute;
  right: 0;
  display: none;
  align-items: center;
  width: 145px;
  height: 81px;
  justify-content: center;
  margin-top: 12px;

  ${(props) =>
    props.showDropDown &&
    css`
      display: flex;
    `}
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DropDownText = styled(Link)`
  font-family: "Roboto";
  color: var(--primaryShaded);
  font-size: 16px;
  font-weight: 500;

  :hover {
    text-decoration: none;
  }
`;

const CustomFaUserAlt = styled(FaUserAlt)`
  width: 14px;
  height: 18px;
  margin-right: 16px;
  color: #1c4b56;
`;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomFaSignOutAlt = styled(FaSignOutAlt)`
  width: 16px;
  height: 18px;
  color: var(--primaryShaded);
`;
const BlockWrapper = styled.div``;
const WrapDropDownWrapper = styled.div`
  position: relative;
`;
const OutDropDown = styled.div`
  @media (max-width: 991.98px) {
    display: none;
  }
`;
