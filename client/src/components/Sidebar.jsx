import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import {
  FaCalendarWeek,
  FaBullseye,
  FaUsers,
  FaTrophy,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";
import ProfilePhoto from "../assets/ProfilePhoto.png";
import Logo from "../assets/Logo.svg";
import axios from "axios";
import NavItem from "./NavItem";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar, userSharedGoals }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  const Logout = () => {
    axios
      .delete("/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        history.push("/login");
        setAuth(null);
      })
      .catch((error) => {
        alert("Logout Failed. Try Again.");
      });
  };
  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [setAuth]);
  const onClickHandler = (e) => {
    e.preventDefault();
    Logout();
  };

  const showSidebarHandler = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Wrapper showSidebar={showSidebar}>
      <LogoWrapper>
        <LogoImg src={Logo} />
      </LogoWrapper>
      <NavItem
        path="/"
        exact={true}
        showSidebarHandler={showSidebarHandler}
        text="Today"
      >
        <FaCalendarWeek />
      </NavItem>
      <NavItem
        path="/goals"
        exact={false}
        showSidebarHandler={showSidebarHandler}
        text="Goals"
      >
        <FaBullseye />
      </NavItem>
      <NavItem
        path="/shares"
        exact={false}
        showSidebarHandler={showSidebarHandler}
        text="Shares"
      >
        <FaUsers />
      </NavItem>
      <NavItem
        path={
          userSharedGoals[0] ? "/leaderboard/" + userSharedGoals[0]._id : ""
        }
        exact={false}
        showSidebarHandler={showSidebarHandler}
        text="Leaderboard"
      >
        <FaTrophy />
      </NavItem>
      {auth.role === "Admin" && (
        <NavItem
          path="/users"
          exact={false}
          showSidebarHandler={showSidebarHandler}
          text="Users"
        >
          <FaUserCog />
        </NavItem>
      )}

      <Hr />
      <ProfileItem onClick={showSidebarHandler} to="/profile">
        <Avator>
          <AvatorImg src={ProfilePhoto} />
        </Avator>
        <ItemText>{auth ? auth.username : ""}</ItemText>
      </ProfileItem>

      <Item>
        <ItemIcon>
          <FaSignOutAlt />
        </ItemIcon>
        <Hover>
          <ItemText onClick={onClickHandler}>Log out</ItemText>
        </Hover>
      </Item>
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
    z-index: 200;
    transform: translateX(-100%);
    border-right: none;
    padding: 30px;
    padding-top: 20px;
  }

  @media (max-width: 575.98px) {
    transition: all 300ms cubic-bezier(0.87, 0, 0.11, 1.2);
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

const ProfileItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  &:hover {
    text-decoration: none;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  &:hover {
    text-decoration: none;
  }

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

const Hover = styled.div`
  cursor: pointer;
`;
