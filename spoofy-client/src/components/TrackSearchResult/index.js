import React from "react";
import { StyledResults } from "./ResultElements";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  // https://stackoverflow.com/a/67681587
  return (
    <StyledResults
      className="d-flex align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumImg}
        style={{ height: "64px", width: "64px" }}
        alt="album cover"
      />
      <div className="ms-4">
        <div>{track.title}</div>
        <div className="text-white-50">{track.artist}</div>
      </div>
    </StyledResults>
  );
}
