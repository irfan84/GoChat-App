import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase"

const signIn = () => {
 auth.signInWithPopup(provider).catch(alert)
}

function Login() {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button variant="outlined" onClick={signIn}>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
display: grid;
height: 100vh;
place-items: center;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 100px;
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;

const Logo = styled.img`
width: 200px;
height: 200px;
margin-bottom: 50px;
`;
