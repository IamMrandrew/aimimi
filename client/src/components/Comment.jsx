import React from "react";
import styled from "styled-components/macro";
import Profilephoto from "../assets/ImageLarge.png";
import { FaHeart } from "react-icons/fa";

const Comment = ({ comment }) => {
  return (
    <Wrapper>
      <Propic>
        <Img src={Profilephoto} />
      </Propic>
      <TextWrapper>
        <Item>
          <Name>Oliva Clerk</Name>
          <Timestamp>3 minutes ago</Timestamp>
        </Item>
        <Content>Nice job, well done!</Content>
        <Button>
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

const Propic = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
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
