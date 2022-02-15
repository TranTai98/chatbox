import React, { useRef, useState } from "react";
import "../App.css";
import axios from "axios";
import user_avatar from "../assets/user.png";
import {
  Container,
  Row,
  Col,
  Image,
  FormControl,
  Button,
  Form
} from "react-bootstrap";


function ChatRoom(props) {
  const {bot_avatar} = props
  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  const showMessage = () =>{
    var _msg = messages;
    _msg.push({
      id: new Date().getTime(),
      text: formValue,
      messageClass: "sent",
      photoURL: user_avatar,
    });
    setMessages(_msg);
  }
  
  const sendMessage = async (e) => {
    e.preventDefault();
    
    var formData = new FormData();
    formData.append('message', formValue)
    const ans = await axios.post('https://socialbotapi.cerebro.host/chat/', formData)
    // const ans = await axios.post('http://127.0.0.1:8000/chat/', formData)
    // const ans = {data:"yes"}
    var _msg = messages;
    _msg.push({
      id: new Date().getTime(),
      text: ans.data,
      messageClass: "received",
      photoURL: bot_avatar,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <Form onSubmit={sendMessage}>
        <FormControl
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Ask me something..."
          className="chat__room-input"
        />

        <Button variant="dark" type="submit" disabled={!formValue} onClick={()=>showMessage()}>
          Send
        </Button>
      </Form>
    </Container>
  );
}

function ChatMessage(props) {
  const { text, photoURL, messageClass } = props.message;

  return (
    <>
      <div className={`message ${messageClass}`}>
        <Image
          src={
            photoURL ||
            user_avatar
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;