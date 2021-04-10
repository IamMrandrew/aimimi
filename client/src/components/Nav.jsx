import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import styled, { css } from "styled-components/macro";
import { FaBell } from "react-icons/fa";
import Profilephoto from "../assets/ProfilePhoto.png";
import { FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Nav = ({ showSidebar, setShowSidebar }) => {
  const IsMatch = useLocation();
  const [title, setTitle] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  const SideBarHandler = (showSidebar) => {
    setShowSidebar(!showSidebar);
  };
  const DropDownHandler = (showDropDown) => {
    setShowDropDown(!showDropDown);
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

  useEffect(() => {
    if (IsMatch.pathname === "/") setTitle("Today");
    if (IsMatch.pathname === "/goals") setTitle("Goals");
    if (IsMatch.pathname === "/shares") setTitle("Shares");
    if (IsMatch.pathname === "/leaderboard") setTitle("Leaderboard");
    if (IsMatch.pathname === "/profile") setTitle("Profile");
    if (IsMatch.pathname === "/activity") setTitle("Activity");
  }, [IsMatch]);

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
  const onClickHandler = (e) => {
    e.preventDefault();
    Logout();
  };

  const onClickProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };
  const onClickBell = (e) => {
    e.preventDefault();
    history.push("/activity");
  };
  return (
    <Wrapper>
      <NavContainer>
        <CustomFaBars onClick={() => SideBarHandler(showSidebar)} />
        <Profile src={Profilephoto} />
        <Today>{title}</Today>
        <OutDropDown>
          <WrapDropDownWrapper>
            <DropDownWrapper>
              <UserName>{auth ? auth.username : ""}</UserName>
              <CustomFaChevronDown
                onClick={() => DropDownHandler(showDropDown)}
              />
            </DropDownWrapper>

            <DownWrapper showDropDown={showDropDown}>
              <BlockWrapper>
                <ProfileWrapper onClick={onClickProfile}>
                  <CustomFaUserAlt />
                  <DropDownText>Profile</DropDownText>
                </ProfileWrapper>
                <LogoutWrapper onClick={onClickHandler}>
                  <CustomFaSignOutAlt />
                  <LoginDropDownText>Logout</LoginDropDownText>
                </LogoutWrapper>
              </BlockWrapper>
            </DownWrapper>
          </WrapDropDownWrapper>
        </OutDropDown>

        <BellWapper onClick={onClickBell}>
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
  width: 24px;
  height: 33px;

  @media (max-width: 991.98px) {
    /* 767.99*/
    display: block;
    justify-content: flex-end;
  }
`;

const Profile = styled.img`
  margin-right: 10px;

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
  cursor: pointer;
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
  cursor: pointer;
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
  align-items: center;
`;

const DropDownText = styled.span`
  font-family: "Roboto";
  color: var(--primaryShaded);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

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
const BlockWrapper = styled.div``;

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
