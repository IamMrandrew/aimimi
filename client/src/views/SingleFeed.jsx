import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import ClimbingPVG from "../assets/Feed_climbing.png";
import Profilephoto from "../assets/ImageLarge.png";
import { FaHeart, FaComments } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import Container from "react-bootstrap/esm/Container";
import Loader from "../components/Loader";
import Comment from "../components/Comment";

const SingleFeed = () => {
  const { id } = useParams();
  const [feed, setFeed] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const leaveCommentHandler = () => {
    axios
      .post(
        "/feed/add_comment",
        { feed_id: feed._id, content: input },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkIfLiked = (feed) => {
    return feed.like.find((liked) => liked === auth._id);
  };

  const Like = (e) => {
    e.preventDefault();

    axios
      .post(`/feed/like/${feed._id}`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    // setFeeds(
    //   feeds.map((item) => {
    //     if (item._id === feed._id) {
    //       return { ...item, like: [...item.like, auth._id] };
    //     }
    //     return item;
    //   })
    // );
  };

  const UnLike = (e) => {
    e.preventDefault();

    axios
      .delete(`/feed/unlike/${feed._id}`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    // setFeeds(
    //   feeds.map((item) => {
    //     if (item._id === feed._id) {
    //       return {
    //         ...item,
    //         like: item.like.filter((e) => e !== auth._id),
    //       };
    //     }
    //     return item;
    //   })
    // );
  };

  useEffect(() => {
    axios
      .get(`/feed/get_feed_view/${id}`, { withCredentials: true })
      .then((response) => {
        setFeed(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      {!loading && (
        <CustomContainer>
          <FeedWrapper>
            <Feed>
              <Content>
                <User>
                  <Propic src={Profilephoto} />
                  <Meta>
                    <Name>{feed ? feed.creator.username : ""}</Name>
                    <Time>
                      {Math.floor(
                        (Date.now() -
                          Date.parse(feed ? feed.created_time : "")) /
                          86400
                      )}{" "}
                      minutes ago
                    </Time>
                  </Meta>
                </User>
                <Status>{feed ? feed.content : ""}</Status>
                <Buttons>
                  {/* <UnClickButton onClick={liked ? UnLike : Like} liked={liked}> */}
                  <Button>
                    <FaHeart />
                    <Number>{feed ? feed.like.length : ""} likes</Number>
                  </Button>
                  <Button>
                    <FaComments />
                    <Number>{feed ? feed.comment.length : ""} comments</Number>
                  </Button>
                </Buttons>
              </Content>
              <Img>
                <ClimbingImg src={ClimbingPVG} />
              </Img>
            </Feed>
            <InputField>
              <Input
                value={input}
                onChange={inputHandler}
                placeholder="Type something here... "
              />
              <MdSend onClick={leaveCommentHandler} />
            </InputField>
          </FeedWrapper>
          {feed.comment.map((item) => (
            <Comment comment={item} />
          ))}
        </CustomContainer>
      )}
      {loading && <Loader />}
    </Wrapper>
  );
};

export default SingleFeed;

const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
  overflow: scroll;
  height: calc(100vh - 60px);

  @media (min-width: 992px) {
    height: calc(100vh - 80px);
  }
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
`;

const FeedWrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 10px;
`;

const Feed = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Meta = styled.div``;

const Content = styled.div``;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Propic = styled.img`
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

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
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

const Img = styled.div``;

const ClimbingImg = styled.img`
  margin-right: 110px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background);
  border-radius: 12px;
  color: #aaaaaa;
  padding: 8px 20px;
  font-size: 22px;
  margin-top: 5px;
  margin-bottom: 10px;

  svg {
    cursor: pointer;
  }
`;

const Input = styled.input`
  background-color: var(--background);
  border: none;
  outline: none;
  border-radius: 12px;
  color: var(--monoPrimary);
  font-size: 15px;
  font-weight: 500;
  width: 100%;

  &::placeholder {
    color: var(--placeholder);
    font-weight: 500;
  }
`;
