import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/config";
import styles from "./style.css";
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";
import background from "./image.jpg";


export async function loader({ params }) {
  const req = await fetch(
    `${API_URL}/api/reservation/${params.user_id}`
  );
  const history = await req.json();
  console.log(history);
  return { history };
}

function SearchForm() {
  return (
      <div style={{ paddingBottom: 200 }}>
        <article style={{ height: "100%", position: "relative", }}>
          <img src={background} alt="House photo" style={{ width: "95%", borderRadius: 40, objectFit: "cover" }} />
          <h1 style={{
            fontSize: 80,
            color: "#C99C1E",
            textAlign: "center",
            position: "absolute",
            top: 0,
            bottom: 300,
            left: 0,
            right: 550,
            height: "fit-content",
            margin: "auto",
            lineHeight: 1.2,
            fontFamily: "cursive",
            textShadow: "8px 6px 4px #000000",
          }}>
            Welcome, <br></br> dear <br></br> traveler!
          </h1>
          <form style={{
            position: "absolute",
            top: 550,
            bottom: 0,
            left: 0,
            right: 0,
            width: 1000,
            height: 255,
            margin: "auto",
            background: "rgba(51, 54, 65, 0.51)",
            borderRadius: 16,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.9px)",
            border: "1px solid  #5F6A7B",
          }}>
            <h3 style={{ margin: 20, textAlign: "left",  }}>Search and Book Your Getaway</h3>
            
          </form>
        </article>
      </div>

    )
}

export default SearchForm;