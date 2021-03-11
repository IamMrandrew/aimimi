import React from "react";
import styled, { css } from "styled-components/macro";
import { FaCalendarWeek, FaBullseye, FaUsers, FaTrophy } from "react-icons/fa";
import ProfilePhoto from "../assets/ProfilePhoto.png";

const Sidebar = ({ showSidebar }) => {
  return (
    <Wrapper showSidebar={showSidebar}>
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
      <Hr />
      <ProfileItem>
        <Avator>
          <AvatorImg src={ProfilePhoto} />
        </Avator>
        <ItemText>Magnus Nicholls</ItemText>
      </ProfileItem>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  border-right: solid 1px var(--grey);
  background-color: white;
  height: 100%;
  padding-top: 100px;

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
  max-width: 180px;
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 991.98px) {
    margin-left: 0;
  }
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 992px) {
    display: none;
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

const Hr = styled.hr`
  border: solid 1px var(--grey);

  @media (min-width: 992px) {
    display: none;
  }
`;

const Avator = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 24px;
  margin-right: 18px;
  overflow: hidden;
`;

const AvatorImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
`;
