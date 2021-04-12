import React from "react";
import styled from "styled-components/macro";
import ProfilePhoto from "../assets/ProfilePhoto.png";

const Rank = ({ rank, index }) => {
  return (
    <Wrapper>
      <ItemWrapper>
        <Flag>#{index}</Flag>
        <Avator>
          <AvatorImg src={ProfilePhoto} />
        </Avator>
        <Item>{rank.username}</Item>
      </ItemWrapper>
      <Item>{rank.accuracy}%</Item>
    </Wrapper>
  );
};

export default Rank;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Flag = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--primaryShaded);
  margin-right: 25px;
`;

const Item = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--primaryShaded);
`;

const Avator = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  margin-right: 10px;
  overflow: hidden;
`;

const AvatorImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
`;
