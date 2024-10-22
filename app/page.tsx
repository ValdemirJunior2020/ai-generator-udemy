"use client";
import { useEffect, useState } from 'react';
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function ClientPageRoot() {
  const [story, setStory] = useState(''); // State to hold the story
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-only code
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

      async function run() {
        try {
          const chatSession = model.startChat({
            generationConfig,
            history: [],
          });

          const result = await chatSession.sendMessage("write a 200 words zen story");
          const storyText = await result.response.text();
          setStory(storyText); // Update the state with the generated story
          setLoading(false); // Set loading to false once the story is fetched
        } catch (error) {
          console.error("Error generating story:", error);
          setLoading(false); // Even on error, stop loading state
        }
      }

      run();
    }
  }, []);

  return (
    <div>
      <h1>Client AI Page</h1>
      {loading ? (
        <p>Generating story...</p> // Show loading message while fetching
      ) : (
        <p>{story}</p> // Display the generated story when ready
      )}
    </div>
  );
}
