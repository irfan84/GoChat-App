import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);

  const { email, photoURL } = user;

  console.log(photoURL);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Pleaase enter an email address of user to chat with");

    if (!input) return null;

    const dat = !!chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => user === input)
    );

    if (EmailValidator.validate(input) && input !== email && dat === false) {
      db.collection("chats").add({
        users: [email, input],
      });
    } else {
      alert("Invalid chat email");
    }
  };
  return (
    <Container>
      <Header>
          <UserAvatar
            src={photoURL}
            onClick={async () => await auth.signOut()}
          />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>START A NEW CHAT</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat
          key={chat.id}
          id={chat.id}
          users={chat.data().users}
          loggedInEmail={email}
        />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

`;

const EmailInfo = styled.p`
  padding-left: 10px;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  flex: 1;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
