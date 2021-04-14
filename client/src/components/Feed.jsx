import React, { useContext } from "react";
import styled from "styled-components/macro";
import Profilephoto from "../assets/ImageLarge.png";
import ClimbingPVG from "../assets/Feed_climbing.png";
import { FaHeart, FaComments } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";
const Feed = ({ feed, liked, feeds, setFeeds }) => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  const Like = (e) => {
    e.preventDefault();

    axios
      .post(`/feed/like/${feed._id}`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setFeeds(
      feeds.map((item) => {
        if (item._id === feed._id) {
          return { ...item, like: [...item.like, auth._id] };
        }
        return item;
      })
    );
  };

  const UnLike = (e) => {
    e.preventDefault();

    axios
      .delete(`/feed/unlike/${feed._id}`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setFeeds(
      feeds.map((item) => {
        if (item._id === feed._id) {
          return {
            ...item,
            like: item.like.filter((e) => e !== auth._id),
          };
        }
        return item;
      })
    );
  };
  return (
    <Wrapper>
      <LeftDiv>
        <FlexWrapper>
          <ProfileImage src={Profilephoto} />
          <BlockDiv>
            <Name>{feed.creator.username}</Name>
            <Time>
              {Math.floor((Date.now() - Date.parse(feed.created_time)) / 86400)}{" "}
              minutes ago
            </Time>
          </BlockDiv>
        </FlexWrapper>
        <Status>{feed.content}</Status>
        <ButtonDiv>
          <UnClickButton onClick={liked ? UnLike : Like} liked={liked}>
            <FaHeart />
            <Number>{feed.like.length} likes</Number>
          </UnClickButton>
          <UnClickButton
            onClick={() => {
              history.push(`/feed/${feed._id}`);
            }}
          >
            <FaComments />
            <Number>{feed.comment.length} comments</Number>
          </UnClickButton>
        </ButtonDiv>
      </LeftDiv>
      <ClimbingImg src={ClimbingPVG} />
    </Wrapper>
  );
};

export default Feed;

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  overflow: hidden;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  @media (max-width: 991.98px) {
    padding: 20px 20px;
    border-radius: 24px;
  }
`;
const LeftDiv = styled.div``;
const BlockDiv = styled.div``;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
`;
const Name = styled.span`
  display: block;
  position: relative;
  z-index: 10;
  color: var(--primaryShaded);
  font-size: 16px;
  font-weight: 700;
  line-height: 0.3;
  margin-left: 15px;
  margin-bottom: 5px;
`;
const Time = styled.span`
  color: #999999;
  font-size: 14px;
  font-weight: 500;
  margin-left: 15px;
`;

const Status = styled.span`
  color: #202020;
  font-size: 15px;
  font-weight: 500;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const UnClickButton = styled.button`
  align-items: center;
  display: flex;
  border-radius: 20px;
  background-color: #f4f4f4;
  height: 26px;
  padding: 11px 11px;
  font-size: 14px;
  color: ${(props) => (props.liked ? "#fe7400" : "#888888")};
  border: none;
  margin-right: 5px;
`;

const Number = styled.span`
  ${(props) => (props.liked ? "#fe7400" : "#888888")};
  font-weight: 500;
  font-size: 14px;
  margin-left: 5px;
`;

const ClimbingImg = styled.img`
  margin-right: 110px;

  @media (max-width: 768px) {
    display: none;
  }
`;
