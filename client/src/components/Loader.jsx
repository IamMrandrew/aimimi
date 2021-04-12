import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components/macro";

const Loader = () => {
  return (
    <Wrapper>
      <ClipLoader color={"var(--primaryGoal)"} />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
