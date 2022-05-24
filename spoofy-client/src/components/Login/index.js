import React from "react";
import { Container, Alert } from "react-bootstrap";
// export const StyledContainer = styled(Container)``;
import { StyledButton } from "./LoginElements";
import Navbar from "../Navbar";

//authorization ref: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
//scope ref: https://developer.spotify.com/documentation/general/guides/authorization/scopes/

const URL =
  "https://accounts.spotify.com/authorize?client_id=5c8eacaec7c049d6a1a138c8e621fa84&response_type=code&redirect_uri=https://clinquant-kringle-12f3b9.netlify.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <>
      <Container className="d-flex flex-column py-2">
        <Navbar />
        <Container
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "75vh" }}
        >
          <Alert variant={"warning"} className="text-center">
            A Spotify account is required to use this application.
            <br />
            If you would like to see a demo, please visit the repo{" "}
            <a href="https://github.com/VNestor/spoofy" className="alert-link">
              here
            </a>
          </Alert>
          <StyledButton type="button" className="btn btn lg" href={URL}>
            Login With Spotify
          </StyledButton>
        </Container>
      </Container>
    </>
  );
}
