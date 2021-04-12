import React from "react";
import styled from "styled-components/macro";

const Rank = ({ rank }) => {
  return (
    <Wrapper>
      <Item>#4</Item>
      <ItemWrapper>
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
  padding: 20px;
`;

const ItemWrapper = styled.div``;

const Item = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--primaryShaded);
`;
