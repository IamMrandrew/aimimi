import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";

// Comment component
const Comment = ({ comment }) => {
  const [commentPropic, setCommentPropic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the comment creator profile picture
  useEffect(() => {
    axios
      .get(`/user/propic/${comment.creator._id}`, { withCredentials: true })
      .then((response) => {
        setCommentPropic(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comment.creator._id]);

  return (
    <Wrapper>
      <Avator>
        {!loading && <AvatorImg src={commentPropic} />}
        {loading && <Loader />}
      </Avator>
      <TextWrapper>
        <Item>
          <Name>{comment.creator.username}</Name>
          <Timestamp>
            {Math.floor(
              (Date.now() - Date.parse(comment.created_time)) / 86400
            )}{" "}
            minutes ago
          </Timestamp>
        </Item>
        <Content>{comment.content}</Content>
        <Button data-testid="commentLikeButton">
          <FaHeart />
          <Number>{comment ? comment.like.length : ""} likes</Number>
        </Button>
      </TextWrapper>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 15px;
  display: flex;
  align-items: top;
  justify-content: flex-start;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Avator = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-right: 18px;
  overflow: hidden;

  & > span {
    border-color: var(--primaryGoal);
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const TextWrapper = styled.div`
  width: 100%;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  display: block;
`;

const Content = styled.span`
  font-size: 15px;
  font-weight: 500;
  display: block;
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #999999;
`;

const Button = styled.button`
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
