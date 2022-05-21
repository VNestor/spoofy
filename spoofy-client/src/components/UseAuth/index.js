import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UseAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  console.log(accessToken);
  console.log(refreshToken);
  console.log(expiresIn);

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        console.log(res);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log(err);
        // Redirect user to home when authorization code expires
        window.location = "/";
      });
  }, [code]);

  // Right before token expires, we refresh it
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, null, "/");
        })
        .catch((err) => {
          console.log(err);
          // Redirect user to home when authorization code expires
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
