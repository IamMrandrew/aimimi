import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components/macro";
import ClimbingPVG from "../assets/Feed_climbing.png";
import { FaAngleLeft, FaHeart, FaComments } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Loader from "../components/Loader";
import Comment from "../components/Comment";

const SingleFeed = () => {
  const { id } = useParams();
  const [feed, setFeed] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [feedPropic, setFeedPropic] = useState(null);
  const [propicloading, setPropicLoading] = useState(true);

  // handle the on click which set the input value oin state
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  // add the input comment
  const leaveCommentHandler = () => {
    const newComment = {
      feed_id: feed._id,
      content: input,
      creator: { username: auth.username },
      created_time: new Date(),
      like: [],
    };
    // after the comment submission, then will send a POST request and post the comment in database
    axios
      .post("/feed/add_comment", newComment, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // then will set the new comment in the state
    setFeed({ ...feed, comment: [...feed.comment, newComment] });
    setInput("");
  };
  // check if user liked before
  const checkIfLiked = () => {
    return feed.like.find((liked) => liked === auth._id);
  };
  // handle the like button
  const Like = (e) => {
    e.preventDefault();
    // Sends a POST request for adding a like for that feed
    axios
      .post(`/feed/like/${feed._id}`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setFeed({ ...feed, like: [...feed.like, auth._id] });
  };

  // handle Unlike
  const UnLike = (e) => {
    e.preventDefault();

    // send a DELETE request to delete like in database
    axios
      .delete(`/feed/unlike/${feed._id}`, { withCredentials: true })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    setFeed({ ...feed, like: feed.like.filter((e) => e !== auth._id) });
  };

  useEffect(() => {
    // When user get into the partically,
    //it will automatically send a GET request to get the details of the feed
    axios
      .get(`/feed/${id}`, { withCredentials: true })
      .then((response) => {
        setFeed(response.data);
        // Get the user profile picture of the feed creater
        axios
          .get(`/user/propic/${response.data.creator._id}`, {
            withCredentials: true,
          })
          .then((response) => {
            setFeedPropic(response.data);
            setPropicLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Wrapper>
      {!loading && (
        <CustomContainer>
          <BackButton to="/activity">
            <FaAngleLeft />
          </BackButton>
          <FeedWrapper>
            <Feed>
              <Content>
                <User>
                  <Avator>
                    {/* Since loading profile picture from database require some time, so we set a loading animation before  */}
                    {!propicloading && <AvatorImg src={feedPropic} />}
                    {propicloading && <Loader />}
                  </Avator>
                  <Meta>
                    {/* Since fetching require some time, therfore , we need to use condition */}
                    <Name>{feed ? feed.creator.username : ""}</Name>
                    <Time>
                      {/* Calculate the time passed after the feed posted */}
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
                  <Button
                    onClick={checkIfLiked() ? UnLike : Like}
                    liked={checkIfLiked()}
                  >
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
          {/* We will map the comment that other users posted */}
          {feed.comment.map((item) => (
            <Comment key={item._id} comment={item} />
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

const Avator = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-right: 18px;
  overflow: hidden;

  & > div {
    height: 100%;
  }

  span {
    border-color: var(--primaryGoal);
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
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

const BackButton = styled(Link)`
  background-color: #f2f4f6;
  width: 44px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 21px;
  cursor: pointer;

  svg {
    color: #202020;
    height: 18px;
    width: 10px;
  }
`;
