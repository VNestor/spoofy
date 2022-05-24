import React, { useEffect, useState } from "react";
import UseAuth from "../UseAuth";
import TrackSearchResult from "../TrackSearchResult";
import WebPlayer from "../WebPlayer";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Navbar from "../Navbar";
import { StyledLyrics } from "./HomepageElements";

const spotifyApi = new SpotifyWebApi({
  clientId: "5c8eacaec7c049d6a1a138c8e621fa84",
});

export default function Homepage({ code }) {
  const accessToken = UseAuth(code);
  // Set user's search
  const [search, setSearch] = useState("");
  // Set user's search results
  const [searchResults, setSearchResults] = useState([]);
  // Set current playing track
  const [playingTrack, setPlayingTrack] = useState();
  // Set lyrics
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  // Access lyrics, and changes everytime current playing track changes
  useEffect(() => {
    // if there is no playingTrack, return
    if (!playingTrack) return;

    axios
      .get("https://spoofy-backend.herokuapp.com/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    //If we don't have an access token, return
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    // if there is no search, set search results to an empty array
    if (!search) return setSearchResults([]);
    // We dont want to query anything if we don't have an access token
    if (!accessToken) return;

    // We cancel request everytime we update our query or access token is refreshed
    let cancelRequest = false;
    spotifyApi.searchTracks(search).then((res) => {
      // do nothing
      if (cancelRequest) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          // Find the smallest image that belongs to the album
          const smallestImg = track.album.images.reduce((smallest, image) => {
            // If current is smallest, return current
            if (image.height < smallest.height) return image;
            // else return smallest
            return smallest;
            // populate very first value
          }, track.album.images[0]);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumImg: smallestImg.url,
          };
        })
      );
    });

    return () => (cancelRequest = true);
  }, [search, accessToken]);
  return (
    <>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <Navbar accessToken={accessToken} />
        <Form.Control
          className="py-3 mt-3"
          type="search"
          placeholder="Search For Artists or Songs"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 && (
            <div className="text-center" style={{ whiteSpace: "pre" }}>
              <StyledLyrics>{lyrics}</StyledLyrics>
            </div>
          )}
        </div>
        <div>
          <WebPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </Container>
    </>
  );
}
