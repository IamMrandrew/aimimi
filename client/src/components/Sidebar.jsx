import React from "react";
import styled, { css } from "styled-components/macro";
import {
  FaCalendarWeek,
  FaBullseye,
  FaUsers,
  FaTrophy,
  FaSignOutAlt,
} from "react-icons/fa";
import ProfilePhoto from "../assets/ProfilePhoto.png";
import Logo from "../assets/Logo.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";

const Sidebar = ({ showSidebar, userInfo }) => {
  const history = useHistory();

  const Logout = () => {
    axios
      .delete("/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        history.push("/login");
      })
      .catch((error) => {
        alert("Logout Failed. Try Again.");
      });
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    Logout();
  };

  return (
    <Wrapper showSidebar={showSidebar}>
      <LogoWrapper>
        <LogoImg src={Logo} />
      </LogoWrapper>
      <NavItem path="/" exact={true} text="Today">
        <FaCalendarWeek />
      </NavItem>
      <NavItem path="/goals" exaxt={false} text="Goals">
        <FaBullseye />
      </NavItem>
      <NavItem path="/shares" exaxt={false} text="Shares">
        <FaUsers />
      </NavItem>
      <NavItem path="/leaderboard" exaxt={false} text="Leaderboard">
        <FaTrophy />
      </NavItem>
      <Hr />
      <ProfileItem>
        <Avator>
          <AvatorImg src={ProfilePhoto} />
        </Avator>
        <ItemText>{userInfo.username}</ItemText>
      </ProfileItem>

      <ProfileItem>
        <ItemIcon>
          <FaSignOutAlt />
        </ItemIcon>
        <ItemText onClick={onClickHandler}>Log out</ItemText>
      </ProfileItem>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  border-right: solid 1px var(--grey);
  background-color: white;
  height: 100%;
  padding-top: 33px;

  /* Bootstrap col-lg-3  */
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 992px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  /* Bootstrap col-lg-3  */

  @media (max-width: 991.98px) {
    position: absolute;
    height: 100%;
    top: 60px;
    left: 0;
    z-index: 100;
    transform: translateX(-100%);
    border-right: none;
    padding: 30px;
    padding-top: 20px;
  }

  @media (max-width: 575.98px) {
    transition: transform 0.65s;
  }

  ${(props) =>
    props.showSidebar &&
    css`
      @media (max-width: 991.98px) {
        transform: translateX(0%);
      }
    `}
`;

const ItemIcon = styled.span`
  font-size: 24px;
  color: var(--primaryShaded);
  font-weight: 700;
  margin-right: 20px;
  position: relative;
  z-index: 1;
`;

const ItemText = styled.span`
  font-size: 18px;
  color: var(--primaryShaded);
  font-weight: 700;
  position: relative;
  z-index: 1;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  @media (min-width: 992px) {
    display: none;
  }
`;

const Hr = styled.hr`
  border: solid 1px var(--grey);

  @media (min-width: 992px) {
    display: none;
  }
`;

const Avator = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-right: 18px;
  overflow: hidden;
`;

const AvatorImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
`;

const LogoWrapper = styled.div`
  max-width: 180px;
  display: flex;
  align-items: baseline;
  margin-bottom: 48px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
`;
