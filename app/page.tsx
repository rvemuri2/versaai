"use client";
import { useState, useEffect } from "react";

import { runAi } from "@/actions/ai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(query);
      setResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="m-5">
        <form onSubmit={handleClick}>
          <Input
            className="mb-5"
            placeholder="Ask Me Anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="bg-blue-500 hover:bg-blue-800">
            Generate with AI
          </Button>
        </form>
        <Card className="mt-5">
          <CardHeader>AI Response</CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ReactMarkdown>{response}</ReactMarkdown>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
