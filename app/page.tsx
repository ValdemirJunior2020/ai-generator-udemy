"use client";  // Add this line at the top
import React from 'react';

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
export default function Page() {
async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [], // properly closed
  });
}
  const result = await chatSession.sendMessage("Write a 200 word blog post on zen");

  // return the response text
  return result.response.text;
}

function App() {
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await run();
      setResponse(data);
    };

    fetchData();
  }, []);

  return <div>{response}</div>;
}

export default App;
