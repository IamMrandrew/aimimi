import React from "react";
import styled from "styled-components/macro";

const Rank = () => {
  return (
    <Wrapper>
      <Item>#4</Item>
      <ItemWrapper>
        <Item>Jane Doe</Item>
      </ItemWrapper>
      <Item>89%</Item>
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
