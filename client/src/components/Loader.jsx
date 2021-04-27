import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components/macro";

// Loader animation
const Loader = () => {
  return (
    <Wrapper data-testid="loaderComponent">
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
