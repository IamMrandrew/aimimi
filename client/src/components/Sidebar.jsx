import React from "react";
import Col from "react-bootstrap/Col";
import styled, { css } from "styled-components/macro";
import { FaCalendarWeek, FaBullseye, FaUsers, FaTrophy } from "react-icons/fa";

const Sidebar = ({ lg, showSidebar }) => {
  return (
    <Wrapper lg={lg}>
      <Content showSidebar={showSidebar}>
        <Item>
          <ItemIcon>
            <FaCalendarWeek />
          </ItemIcon>
          <ItemText>Today</ItemText>
        </Item>
        <Item>
          <ItemIcon>
            <FaBullseye />
          </ItemIcon>
          <ItemText>Goals</ItemText>
        </Item>
        <Item>
          <ItemIcon>
            <FaUsers />
          </ItemIcon>
          <ItemText>Shared Goal</ItemText>
        </Item>
        <Item>
          <ItemIcon>
            <FaTrophy />
          </ItemIcon>
          <ItemText>Leaderboard</ItemText>
        </Item>
      </Content>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled(Col)`
  @media (max-width: 991.99px) {
    position: absolute;
    height: 100%;
    top: 60px;
    left: 0;
    z-index: 100;
  }
`;

const Content = styled.div`
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

const Item = styled.div`
  max-width: 180px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 991.99px) {
    margin-left: 0;
  }
`;

const ItemIcon = styled.span`
  font-size: 28px;
  color: var(--primaryShaded);
  font-weight: 700;
  margin-right: 20px;
`;

const ItemText = styled.span`
  font-size: 20px;
  color: var(--primaryShaded);
  font-weight: 700;
`;
