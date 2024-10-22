"use client";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Use ES6 imports

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function ClientPageRoot() {
  const [story, setStory] = useState(""); // State to hold the story
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    async function run() {
      if (!apiKey) {
        console.error("API key is missing");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        // Client-only code
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        const generationConfig = {
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
          generationConfig,
          history: [], // Empty history for now
        });

        try {
          const result = await chatSession.sendMessage(
            "Write a one-liner short zen story"
          );
          setStory(result.response.text); // Update the story state
        } catch (error) {
          console.error("Error generating story:", error);
        } finally {
          setLoading(false); // Stop loading after completion
        }
      }
    }

    run();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Generated Story: {story}</p>}
    </div>
  );
}
