import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import axios from "axios";
import SharedGoal from "../components/SharedGoal";

const Shares = () => {
  const [publicGoal, setPublicGoal] = useState(null);

  useEffect(() => {
    axios
      .get("/goal/public_goal", { withCredentials: true })
      .then((response) => {
        setPublicGoal(response.data.data);
        console.log(publicGoal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Shares</Title>
        <Subtitle>Recommended For You</Subtitle>

        <Subtitle>Trending</Subtitle>
        {publicGoal &&
          publicGoal.map((goal) => <SharedGoal key={goal._id} goal={goal} />)}
      </CustomContainer>
    </Wrapper>
  );
};

export default Shares;
const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--primaryShaded);
  margin-bottom: 30px;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const Subtitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  display: block;
  margin-top: 38px;

  @media (max-width: 991.98px) {
    margin-top: 0px;
  }
`;
