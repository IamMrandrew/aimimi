import React from "react";
import Col from "react-bootstrap/Col";
import styled, { css } from "styled-components";
import { FaCalendarWeek, FaBullseye, FaUsers, FaTrophy } from "react-icons/fa";

const Sidebar = ({ lg, showSidebar }) => {
  return (
    <SidebarCol lg={lg}>
      <SidebarContainer showSidebar={showSidebar}>
        <SidebarItem>
          <SidebarItemIcon>
            <FaCalendarWeek />
          </SidebarItemIcon>
          <SidebarItemText>Today</SidebarItemText>
        </SidebarItem>
        <SidebarItem>
          <SidebarItemIcon>
            <FaBullseye />
          </SidebarItemIcon>
          <SidebarItemText>Goals</SidebarItemText>
        </SidebarItem>
        <SidebarItem>
          <SidebarItemIcon>
            <FaUsers />
          </SidebarItemIcon>
          <SidebarItemText>Shared Goal</SidebarItemText>
        </SidebarItem>
        <SidebarItem>
          <SidebarItemIcon>
            <FaTrophy />
          </SidebarItemIcon>
          <SidebarItemText>Leaderboard</SidebarItemText>
        </SidebarItem>
      </SidebarContainer>
    </SidebarCol>
  );
};

export default Sidebar;

const SidebarCol = styled(Col)`
  @media (max-width: 991.99px) {
    position: absolute;
    height: 100%;
    top: 60px;
    left: 0;
    z-index: 100;
  }
`;

const SidebarContainer = styled.div`
  border-right: solid 1px var(--grey);
  background-color: white;
  height: 100%;
  padding-top: 100px;
  transition: transform 0.65s;

  @media (max-width: 991.99px) {
    transform: translateX(-100%);
    border-right: none;
    padding: 15px;
    padding-top: 20px;
  }

  ${(props) =>
    props.showSidebar &&
    css`
      @media (max-width: 991.99px) {
        transform: translateX(0%);
      }
    `}
`;

const SidebarItem = styled.div`
  max-width: 180px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 991.99px) {
    margin-left: 0;
  }
`;

const SidebarItemText = styled.span`
  font-size: 20px;
  color: var(--primaryShaded);
  font-weight: 700;
`;

const SidebarItemIcon = styled.span`
  font-size: 28px;
  color: var(--primaryShaded);
  font-weight: 700;
  margin-right: 20px;
`;
