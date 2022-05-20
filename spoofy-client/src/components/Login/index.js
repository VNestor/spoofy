import React from "react";
import { Container } from "react-bootstrap";
// export const StyledContainer = styled(Container)``;
import { StyledButton } from "./LoginElements";

//authorization ref: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
//scope ref: https://developer.spotify.com/documentation/general/guides/authorization/scopes/

const URL =
  "https://accounts.spotify.com/authorize?client_id&response_type=code&redirect_url=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <Container>
      <StyledButton type="button" className="btn btn-success btn lg" href={URL}>
        Login With Spotify
      </StyledButton>
    </Container>
  );
}
