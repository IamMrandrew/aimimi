import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Feed from "../components/Feed";
import { AuthContext } from "../contexts/AuthContext";
const Activity = () => {
  const [feeds, setFeeds] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/feed", { withCredentials: true })
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkIfLiked = (feed) => {
    return feed.like.find((liked) => liked === auth._id);
  };

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Activity</Title>
        {feeds.map((feed) => (
          <Feed feed={feed} key={feed._id} liked={checkIfLiked(feed)} />
        ))}
      </CustomContainer>
    </Wrapper>
  );
};

export default Activity;

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
