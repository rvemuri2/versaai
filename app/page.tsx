"use client";
import { useState, useEffect } from "react";

import { runAi } from "@/actions/ai";

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await runAi("write a song about love");
      setResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button onClick={handleClick}>Run AI</button>
      <hr />
      <div>{loading ? "Loading..." : response}</div>
    </>
  );
}
