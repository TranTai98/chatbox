import React, {useState} from "react"
import {Button, Col, Container, FormControl, Image, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faShare, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

const Post = (props) =>{
    const {id, detail, image} = props
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const likedColor = isLiked ? "#0472E4" : "";

    const handleLiked = () => {
        setIsLiked(!isLiked);
    };

    const handleComment = () => {
        setIsComment(true);
    };
    return <Container id={id} className="home__page-wall__item">
                <Row>
                  <Col sm={1}>
                    <Image
                      src={require("../assets/user.png")}
                      roundedCircle
                      className="home__page-wall__post-avatar"
                    />
                  </Col>
                  <Col sm={10} className="ms-2">
                    <div className="fs-14 fw-600">Tran Le</div>
                    <div className="fs-14 fw-500">1 giờ</div>
                  </Col>
                </Row>
                <div className="mt-2 fs-14 fw-500">
                  {detail}
                </div>
                {image ? <Image
                    src={image}
                    rounded
                    className="home__page-wall__item-image"
                /> : null}
                <Row>
                  <Col sm={6}>
                    <FontAwesomeIcon icon={faThumbsUp} color={"#0472E4"} />
                    <span className="ms-2 fs-14">14k </span>
                  </Col>
                  <Col sm={6} className="text-end">
                    <span className="fs-14">251 bình luận</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="fs-14">251 lượt chia sẻ</span>
                  </Col>
                </Row>
                <div className="line-horizontal"/>
                <Row className="mt-2">
                  <Col sm={4} className="text-center">
                    <Button
                      variant="outline-dark shadow-none border-0"
                      onClick={handleLiked}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} color={likedColor} />
                      <span
                        className={
                          isLiked
                            ? "ms-2 fs-14 fw-500 liked-color"
                            : "ms-2 fs-14 fw-500"
                        }
                      >
                        Thích
                      </span>
                    </Button>
                  </Col>
                  <Col sm={4} className="text-center">
                    <Button
                      variant="outline-dark shadow-none border-0"
                      onClick={handleComment}
                    >
                      <FontAwesomeIcon icon={faComment} />
                      <span className="ms-2 fs-14 fw-500 ">Bình luận</span>
                    </Button>
                  </Col>
                  <Col sm={4} className="text-center">
                    <Button variant="outline-dark shadow-none border-0">
                      <FontAwesomeIcon icon={faShare} />
                      <span className="ms-2 fs-14 fw-500">Chia sẻ</span>
                    </Button>
                  </Col>
                </Row>
                <div className="line-horizontal"/>
                <Row className="mt-4 align-items-center">
                  <Col sm={1}>
                    <Image
                      src={require("../assets/user.png")}
                      roundedCircle
                      className="home__page-wall__post-avatar"
                    />
                  </Col>
                  <Col sm={10} className="ms-3">
                    <FormControl
                      placeholder="Viết bình luận..."
                      style={{ borderRadius: 20, width: "100%" }}
                      className="fs-14 fw-500"
                    />
                  </Col>
                </Row>
              </Container>
}
export default Post
