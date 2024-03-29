import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function WebPlayer({ accessToken, trackUri }) {
  // Make sure we play after song is chosen
  const [play, setPlay] = useState(false);
  // Sets play to true everytime trackUri is changed
  useEffect(() => setPlay(true), [trackUri]);
  // Don't render spotify player if we don't have an access token
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      styles={{
        activeColor: "#fff",
        bgColor: "#282828",
        trackNameColor: "#fff",
        trackArtistColor: "#a9a9a9",
        sliderColor: "#fff",
        sliderTrackColor: "#a9a9a9",
        sliderHandleColor: "#fff",
        sliderTrackBorderRadius: "#fff",
        color: "#fff",
      }}
      token={accessToken}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
}
