import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useState } from "react";
import firebase from "firebase";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessage = () => {
    if (messageSnapshot) {
      return messageSnapshot?.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
    else {
      return messages.map((message) => {
        <Message key={message.id} user={message.user} message={message} />
      })
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastseen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  return (
    <Container>
      <Header>
        <UserAvatar />
        <InfoContainer>
          <h3>test@test.com</h3>
          <p>Last seen</p>
        </InfoContainer>
        <IconContainer>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>

      <MessageContainer>{showMessage()}</MessageContainer>
      <EndOfMessages />
      <InputContainer>
        <InsertEmoticonIcon />
        <TextBox value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-left: 15px;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const IconContainer = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessages = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  background-color: white;
  bottom: 0;
  z-index: 100;
`;

const TextBox = styled.input`
  flex: 1;
  align-items: center;
  padding: 20px;
  bottom: 0;
  background-color: whitesmoke;
  position: sticky;
  outline: 0;
  border: none;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;
