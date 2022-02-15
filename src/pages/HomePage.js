import {
  Container,
  Row,
  Col,
  Image,
  FormControl,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import React, { useState } from "react";
import {
  faArchive,
  faBars,
  faCog,
  faExclamationTriangle,
  faEye,
  faHistory,
  faSearch,
  faSlidersH,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPen,
  faEllipsisH,
  faVideo,
  faImages,
  faFlag,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { ChatRoom } from "../components/index";
import axios from "axios";
import Post from "../components/post";
import { faWindows } from "@fortawesome/free-brands-svg-icons";

const INFOS = [
  "Đã học tại trường XYZ",
  "Đang sống tại thành phố HCM",
  "Đên từ thành phố XYZ",
  "Đã kết hôn",
];
const NOTI = [
  "Quyền riêng tư",
  "Điều khoản",
  "Quảng cáo",
  "Lựa chọn quảng cáo",
  "Cookie",
  "Xem thêm",
  "Meta @ 2022",
];

const MENUS = ["Bài viết", "Giới thiệu", "Bạn bè", "Ảnh", "Video", "Check in"];

const DEFAULT_POST = {
  detail: "Tôi có nuôi 1 con Vẹt được 3 năm, 3 năm tôi dạy nó nói tiếng người",
  image: require("../assets/con-vet.jpeg"),
};

const HomePage = () => {
  const [progress, setProgress] = useState(0);
  const [postList, setPostList] = useState([DEFAULT_POST]);
  const [isFetching, setFetch] = useState(false);

  const gen_image = async () => {
    const formData = new FormData();
    formData.append("seed", progress.toString());
    await axios
      .post("https://socialbotapi.cerebro.host/avatar/", formData)
      .then(() => {
        window.location.reload();
      });
    // let _image = IMAGE
    // _image.id = res.data.id
    // _image.image = "https://socialbotapi.cerebro.host/media/avatar.jpg"
    // setIMAGE(_image)
  };

  const handleInput = (e) => {
    setProgress(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setFetch(true);
    const post_detail = e.target[0].value;
    // Update post state
    const formData = new FormData();
    formData.append("post_detail", post_detail);
    // Test Local
    // const res = await axios.post("http://127.0.0.1:8000/postgen/", formData)
    const res = await axios.post(
      "https://socialbotapi.cerebro.host/postgen",
      formData
    );
    if (res) {
      let _temp = [...postList];
      _temp.push({
        detail: res.data,
      });
      setPostList(_temp);
      setFetch(false);
      e.target[0].value = "";
    }
  };

  return (
    <Container fluid >
      <Row>
        <Col sm={7}>
          <Row className="position-relative">
            <Image
              src={require("../assets/cover-image.jpeg")}
              className="home__page-cover__image"
            />
            <Image
              src={require("../assets/user.png")}
              className="home__page-avatar"
              roundedCircle
            />
            <Row className="ml-150 mt-20">
              <Col sm={3} className="text-white-color">
                <div className="fw-700 fs-32 text-private">Tran Le</div>
                <div>419 Bạn bè</div>
              </Col>
              <Col
                sm={4}
                className="text-center d-flex justify-content-end align-items-center"
              >
                <Button className="fs-14 fw-500 shadow-none">
                  <FontAwesomeIcon icon={faPlusCircle} />
                  &nbsp; Thêm vào tin
                </Button>
              </Col>
              <Col
                sm={5}
                className="text-center d-flex justify-content-end align-items-center"
              >
                <Button
                  variant="secondary"
                  className="fs-14 fw-500 shadow-none"
                >
                  <FontAwesomeIcon icon={faPen} />
                  &nbsp; Chỉnh sửa trang cá nhân
                </Button>
              </Col>
            </Row>
          </Row>
          <div className="line-horizontal mt-40" />
          <Row className="mt-20">
            <Col sm={11}>
              {MENUS.map((menu, index) => {
                return (
                  <Button
                    variant="outline-secondary"
                    className="border-0 shadow-none fw-500 text-white-color"
                    key={index}
                  >
                    {menu}
                  </Button>
                );
              })}
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  className="border-0 shadow-none fw-500 text-white-color"
                >
                  Xem thêm
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Thể thao</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Âm nhạc</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Phim</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Chương trình TV
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Sách</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Thích</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Sự kiện</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Câu hỏi</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Bài đánh giá đã viết
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Nhóm</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Quản lý các phần
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={1}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary shadow-none" id="toggles">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    Chế độ xem
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                    Tìm kiếm trên trang cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    Trạng thái tài khoản
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faArchive} />
                    Kho lưu trữ
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faHistory} />
                    Kho lưu trữ tin
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                    Nhật ký hoạt động
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className=" fw-500 shadow-none"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Cài đặt trang cá nhân và gắn thẻ
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <div className="line-horizontal mt-20" />
          <Row className="mt-40">
            <Col sm={4}>
              <Container className="home__page-information__wrap">
                <h5>Giới thiệu</h5>
                {INFOS.map((info, index) => {
                  return (
                    <div key={index} className="home__page-information">
                      {info}
                    </div>
                  );
                })}
                <Button variant="secondary shadow-none w-100 mt-20 fs-14 fw-600">
                  Chỉnh sửa giới thiệu
                </Button>
                <Button variant="secondary shadow-none w-100 mt-20 fs-14 fw-600">
                  Thêm sở thích
                </Button>
                <Button variant="secondary shadow-none w-100 mt-20 fs-14 fw-600">
                  Thêm nội dung đáng chú ý
                </Button>
              </Container>
              <Container className="home__page-picture">
                <div className="home__page-picture__right">
                  <a href="#">
                    <h5>Ảnh</h5>
                  </a>
                </div>
                <div className="home__page-picture__left">
                  <a href="#">
                    <h5> Xem tất cả ảnh</h5>
                  </a>
                </div>
              </Container>
              <Container className="home__page-friend">
                <div className="home__page-picture__right">
                  <a href="#">
                    <h5>Bạn bè</h5>
                  </a>
                </div>
                <div className="home__page-picture__left">
                  <a href="#">
                    <h5> Xem tất cả bạn bè</h5>
                  </a>
                </div>
              </Container>
              {/* */}
              <Container className="p-0">
                <Row>
                  {NOTI.map((noti, index) => {
                    return (
                      <Col
                        lg="5"
                        key={index}
                        className="home__page-notification"
                      >
                        <a href="#">{noti}</a>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Col>
            <Col sm={8}>
              <Container className="home__page-wall__post">
                <Row>
                  <Col sm={1}>
                    <Image
                      src={require("../assets/user.png")}
                      roundedCircle
                      className="home__page-wall__post-avatar"
                    />
                  </Col>
                  <Col sm={10} className="ms-3">
                    {/*<Button*/}
                    {/*  variant="light"*/}
                    {/*  style={{ borderRadius: 20, width: "100%", color: "#999" }}*/}
                    {/*  className="text-start"*/}
                    {/*>*/}
                    {/*  Bạn đang nghĩ gì?*/}
                    {/*</Button>*/}
                    <Form
                      className="fs-14 fw-500 position-relative"
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#efecec",
                      }}
                      onSubmit={handlePost}
                    >
                      <FormControl
                        placeholder="Bạn đang nghĩ gì?"
                        style={{
                          borderRadius: 20,
                          color: "#999",
                          marginRight: "10px",
                        }}
                        disabled={isFetching}
                      />
                      <Button type={"submit"} disabled={isFetching}>
                        {isFetching ? (
                          <FontAwesomeIcon icon={faSpinner} />
                        ) : (
                          "Post"
                        )}
                      </Button>
                    </Form>
                  </Col>
                </Row>
                <div className="line-horizontal" />
                <Row>
                  <Col sm={4} className="home__page-wall__post-item p-0 mt-2">
                    <Button variant="outline-secondary border-0 shadow-none fs-14 fw-500">
                      <FontAwesomeIcon
                        icon={faVideo}
                        color={"#F4425F"}
                        size="lg"
                      />
                      &nbsp; Video trực tiếp
                    </Button>
                  </Col>
                  <Col sm={4} className="home__page-wall__post-item p-0 mt-2">
                    <Button variant="outline-secondary border-0 shadow-none fs-14 fw-500">
                      <FontAwesomeIcon
                        icon={faImages}
                        color={"#45BD62"}
                        size="lg"
                      />
                      &nbsp; Ảnh/Video
                    </Button>
                  </Col>
                  <Col sm={4} className="home__page-wall__post-item p-0 mt-2">
                    <Button variant="outline-secondary border-0 shadow-none fs-14 fw-500">
                      <FontAwesomeIcon
                        icon={faFlag}
                        color={"#39B0D5"}
                        size="lg"
                      />
                      &nbsp; Sự kiện trong đời
                    </Button>
                  </Col>
                </Row>
              </Container>
              <Row className="home__page-manager__write">
                <Col lg={6} className="home__page-manager__write-write">
                  <h1>Bài viết</h1>
                </Col>
                <Col lg={6} className="home__page-manager__write-manager">
                  <Button className="home__page-manager__write-manager-filter">
                    <FontAwesomeIcon icon={faSlidersH} />
                    <h3>Bộ lọc</h3>
                  </Button>
                  <Button className="home__page-manager__write-manager-manage">
                    <FontAwesomeIcon icon={faCog} />
                    <h3>Quản lý bài viết</h3>
                  </Button>
                </Col>
              </Row>
              <Row className="home__page-view__list">
                <Col sm={6} className="home__page-view__list-view">
                  <a href="#">
                    <FontAwesomeIcon icon={faBars} />
                    <h1>Xem theo danh sách</h1>
                  </a>
                </Col>
                <Col sm={6} className="home__page-view__list-list">
                  <a href="#">
                    <FontAwesomeIcon icon={faWindows} />
                    <h1>Chế độ xem lưới</h1>
                  </a>
                </Col>
              </Row>
              {postList
                .slice(0)
                .reverse()
                .map((post) => {
                  return <Post detail={post.detail} image={post.image} />;
                })}
            </Col>
          </Row>
          <input
            className="w-100 mt-20"
            value={progress}
            onChange={handleInput}
            type="range"
            step="1"
            min="0"
            max="255"
          />
          <Button className="mb-50" onClick={gen_image}>
            Confirm
          </Button>
        </Col>
        <Col sm={5}>
          <ChatRoom bot_avatar="https://socialbotapi.cerebro.host/media/avatar.jpg" />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
