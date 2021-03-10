import React from "react";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { FaCalendarWeek, FaBullseye, FaUsers, FaTrophy } from "react-icons/fa";

const Sidebar = ({ xs }) => {
  return (
    <SidebarContainer xs={xs}>
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
  );
};

export default Sidebar;

const SidebarContainer = styled(Col)`
  @media (max-width: 991.99px) {
    display: none;
  }
  border-right: solid 1px var(--grey);
  padding: 40px;
  padding-top: 100px;
`;

const SidebarItem = styled.div`
  max-width: 180px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
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
