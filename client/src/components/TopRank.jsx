import React from "react";
import styled from "styled-components/macro";
import ProfilePhoto from "../assets/ProfilePhoto.png";

const TopRank = ({ rank, index }) => {
  return (
    <Wrapper index={index}>
      <Content index={index}>
        <Flag index={index}>#{index}</Flag>
        <Avator>
          <AvatorImg src={ProfilePhoto} />
        </Avator>
        <Item>{rank.username}</Item>
        <Item>{rank.accuracy}%</Item>
      </Content>
    </Wrapper>
  );
};

export default TopRank;

const Wrapper = styled.div`
  padding: 0px 15px;
  display: flex;
  align-items: flex-end;
  order: ${(props) =>
    props.index === 1 ? 2 : props.index === 2 ? 1 : props.index === 3 ? 3 : 1};

  @media (max-width: 991.98px) {
    padding: 0px 4px;
  }
`;

const Content = styled.div`
  height: 100%;
  min-width: 140px;
  max-height: ${(props) =>
    props.index === 1
      ? "215px"
      : props.index === 2
      ? "196px"
      : props.index === 3
      ? "172px"
      : "215px"};

  justify-content: space-between;
  background-color: white;
  padding: 20px;
  border-radius: 14px 14px 0px 0px;

  @media (max-width: 991.98px) {
    min-width: 100px;
    max-height: 180px;
  }

  span:nth-child(1) {
    text-align: right;
  }
`;

const Flag = styled.span`
  text-align: center;
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.index === 1
      ? "#FDA428"
      : props.index === 2
      ? "#989898"
      : props.index === 3
      ? "#C5852D"
      : "var(--primaryShaded)"};
`;

const Item = styled.span`
  text-align: center;
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: "var(--primaryShaded)";
`;

const Avator = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-top: 16px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

const AvatorImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
`;
