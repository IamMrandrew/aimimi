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

const Sidebar = ({ showSidebar }) => {
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
      <Item>
        <ItemIcon>
          <FaCalendarWeek />
        </ItemIcon>
        <ItemText>Today</ItemText>
        <ItemHover />
      </Item>
      <Item>
        <ItemIcon>
          <FaBullseye />
        </ItemIcon>
        <ItemText>Goals</ItemText>
        <ItemHover />
      </Item>
      <Item>
        <ItemIcon>
          <FaUsers />
        </ItemIcon>
        <ItemText>Shared Goal</ItemText>
        <ItemHover />
      </Item>
      <Item>
        <ItemIcon>
          <FaTrophy />
        </ItemIcon>
        <ItemText>Leaderboard</ItemText>
        <ItemHover />
      </Item>
      <Hr />
      <ProfileItem>
        <Avator>
          <AvatorImg src={ProfilePhoto} />
        </Avator>
        <ItemText>Magnus Nicholls</ItemText>
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

const Item = styled.div`
  max-width: 200px;
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  position: relative;
  padding: 4px 15px;

  @media (max-width: 991.98px) {
    margin-left: 0;
  }

  :hover div {
    opacity: 100%;
    transform: scale(1);
  }
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  @media (min-width: 992px) {
    display: none;
  }
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

const ItemHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 10px;
  opacity: 0;
  background-color: var(--primaryTrans);
  transform: scale(0.5);
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);

  /* background-color: var(--primaryTrans); */
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
