import React, { useState, useEffect } from "react";
import { Container, NavDropdown } from "react-bootstrap";
import { StyledNavbar } from "./NavbarElements";
import SpotifyWebApi from "spotify-web-api-node";

const CLIENT_ENV = `${process.env.REACT_APP_CLIENT_ID}`;
const URL =
  "https://accounts.spotify.com/authorize?client_id=" +
  CLIENT_ENV +
  "&response_type=code&redirect_uri=https://clinquant-kringle-12f3b9.netlify.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const LOGOUT_URL = "https://www.spotify.com/us/logout/";
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ENV,
});

export default function Navbar({ accessToken }) {
  const [displayName, setDisplayName] = useState("Not Signed In");
  const [navElements, setNavElements] = useState("");

  // Set access token
  useEffect(() => {
    // If we don't have an access token, return
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Get display_name
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => {
        setDisplayName(data.body.display_name);
      })
      .catch((error) => console.log("An Error Occured: " + error));
  }, [accessToken]);

  // Show display name after signed in.
  useEffect(() => {
    let user;
    if (!accessToken) {
      user = (
        <NavDropdown align="end" title="Not Signed In">
          <NavDropdown.Item href={URL}>Sign In</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      user = (
        <NavDropdown align="end" title={displayName}>
          <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
        </NavDropdown>
      );
    }
    setNavElements(user);
  }, [accessToken, displayName]);

  // Logout user using Spotify URL
  function handleLogout() {
    const logoutWindow = window.open(
      LOGOUT_URL,
      "Spotify Logout",
      "width=500, height=700, top=40, left=40"
    );
    setTimeout(() => logoutWindow.close(), 1000);
    setTimeout(() => window.location.reload(false), 2000);
  }

  return (
    <StyledNavbar className="py-3" bg="dark" variant="dark" expand="lg">
      <Container>
        <StyledNavbar.Brand>Spoofy</StyledNavbar.Brand>
        {navElements}
      </Container>
    </StyledNavbar>
  );
}
