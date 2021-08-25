import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

function Chat({ id, users, loggedInEmail }) {
  const recipientEmail = getRecipientEmail(users, loggedInEmail);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  console.log(recipient)

  const router = useRouter();
  const enterChat = () => router.push(`/chat/${id}`);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photo} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <Email>{recipientEmail}</Email>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const Email = styled.p``;

const UserAvatar = styled(Avatar)`
  margin-right: 15px; ;
`;
