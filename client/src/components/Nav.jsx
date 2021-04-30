import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import styled, { css } from "styled-components/macro";
import { FaBell } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader";

//Showing the navbar
const Nav = ({ showSidebar, setShowSidebar }) => {
  const IsMatch = useLocation();
  const [title, setTitle] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const { auth, setAuth, propic, setPropic, authLoading } = useContext(
    AuthContext
  );
  const history = useHistory();
  const SideBarHandler = (showSidebar) => {
    setShowSidebar(!showSidebar);
  };
  const DropDownHandler = (showDropDown) => {
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    // get user information
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [setAuth]);

  // Check which page user is now viewing and set the corresponding title
  useEffect(() => {
    if (IsMatch.pathname === "/") setTitle("Today");
    if (IsMatch.pathname === "/goals") setTitle("Goals");
    if (IsMatch.pathname === "/shares") setTitle("Shares");
    if (IsMatch.pathname === "/leaderboard") setTitle("Leaderboard");
    if (IsMatch.pathname === "/profile") setTitle("Profile");
    if (IsMatch.pathname === "/activity") setTitle("Activity");
  }, [IsMatch]);

  // Handle logout if user clicked the logout button
  const Logout = () => {
    // Send a delete request to clear the cookie and the information
    axios
      .delete("/user/logout", {
        withCredentials: true,
      })
      .then((response) => {
        history.push("/login");
        setAuth(null);
        setPropic(null);
      })
      .catch((error) => {
        alert("Logout Failed. Try Again.");
      });
  };

  // Run Logout function if user clicked the button
  const onClickHandler = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
    Logout();
  };

  // Route user to profile page if clicked the profile button
  const onClickProfile = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
    history.push("/profile");
  };

  // Route user to activity page if user clicked the bell icon
  const onClickBell = (e) => {
    e.preventDefault();
    history.push("/activity");
  };
  return (
    <Wrapper>
      <NavContainer>
        <CustomFaBars onClick={() => SideBarHandler(showSidebar)} data-testid='sidebarButton'/>
        <Avator>
          {!authLoading && <AvatorImg src={propic} />}
          {authLoading && <Loader />}
        </Avator>
        <Today>{title}</Today>
        <OutDropDown>
          <WrapDropDownWrapper>
            <DropDownWrapper onClick={() => DropDownHandler(showDropDown)} data-testid='dropDownButton'>
              <UserName>{auth ? auth.username : ""}</UserName>
              <CustomFaChevronDown />
            </DropDownWrapper>

            <DownWrapper showDropDown={showDropDown}>
              <BlockWrapper>
                <ProfileWrapper onClick={onClickProfile} data-testid='profileButton'>
                  <CustomFaUserAlt />
                  <DropDownText>Profile</DropDownText>
                </ProfileWrapper>
                <LogoutWrapper onClick={onClickHandler} data-testid='logoutButton'>
                  <CustomFaSignOutAlt />
                  <LoginDropDownText>Logout</LoginDropDownText>
                </LogoutWrapper>
              </BlockWrapper>
            </DownWrapper>
          </WrapDropDownWrapper>
        </OutDropDown>

        <BellWapper onClick={onClickBell} data-testid='bellButton'>
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
  cursor: pointer;
`;
const CustomFaBell = styled(FaBell)`
  width: 20px;
  height: 30px;

  @media (max-width: 991.98px) {
    /* 767.99*/
    display: block;
    justify-content: flex-end;
  }
`;

const Avator = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-right: 10px;
  overflow: hidden;

  & > div {
    height: 100%;
  }

  span {
    border-color: var(--primaryGoal);
  }

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
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
  cursor: pointer;
  @media (max-width: 991.98px) {
    display: block;
    justify-content: flex-start;
  }
`;

const DropDownWrapper = styled.div`
  background-color: var(--background);
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  cursor: pointer;

  :hover {
    background-color: var(--primaryTrans);
  }
  transition: background 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
  @media (max-width: 991.98px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 600;
  color: var(--primaryShaded);
  margin-left: 18px;
  margin-right: 30px;
`;

const CustomFaChevronDown = styled(FaChevronDown)`
  color: var(--primaryShaded);
  width: 18px;
  height: 18px;
  margin-right: 14px;
  cursor: pointer;
`;

const DownWrapper = styled.div`
  background-color: white;
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  position: absolute;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  width: 145px;
  height: 81px;
  justify-content: center;
  margin-top: 12px;
  pointer-events: ${(props) => (props.showDropDown ? "all" : "none")};
  transform: ${(props) => (props.showDropDown ? "scale(1.15)" : "scale(1)")};
  opacity: ${(props) => (props.showDropDown ? "1" : "0")};
  transition: all 200ms cubic-bezier(0.87, 0, 0.11, 1.2);

  /* ${(props) =>
    props.showDropDown &&
    css`
      display: flex;
    `} */
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
`;

const DropDownText = styled.span`
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
  cursor: pointer;
`;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomFaSignOutAlt = styled(FaSignOutAlt)`
  width: 16px;
  height: 18px;
  color: var(--primaryShaded);
  cursor: pointer;
  position: relative;
  z-index: 100;
`;
const BlockWrapper = styled.div`
  cursor: pointer;
  user-select: none;
`;

const WrapDropDownWrapper = styled.div`
  position: relative;
`;

const OutDropDown = styled.div`
  @media (max-width: 991.98px) {
    display: none;
  }
`;

const LoginDropDownText = styled.span`
  font-family: "Roboto";
  color: var(--primaryShaded);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  z-index: 100;
  :hover {
    text-decoration: none;
  }
`;
