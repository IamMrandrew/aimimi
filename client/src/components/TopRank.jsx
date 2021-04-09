import React from "react";
import styled from "styled-components/macro";

const TopRank = () => {
  return (
    <Wrapper>
      <Content>
        <Item>#4</Item>
        <Item>Jane Doe</Item>
        <Item>89%</Item>
      </Content>
    </Wrapper>
  );
};

export default TopRank;

const Wrapper = styled.div`
  padding: 0px 15px;
  display: flex;
  align-items: flex-end;

  @media (max-width: 991.98px) {
    padding: 0px 4px;
  }
`;

const Content = styled.div`
  height: 100%;
  min-width: 140px;
  max-height: 215px;
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

const Item = styled.span`
  text-align: center;
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--primaryShaded);
`;
