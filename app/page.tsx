"use client";
import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const runGenerativeAI = async () => {
      const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
      const apiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
  
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
  
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      };
  
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const result = await chatSession.sendMessage('one line of a zen story');
      console.log(result.response.text());
    };

    runGenerativeAI();
  }, []);

  return (
    <div>
      <h1>Generative AI Page</h1>
      <p>Check the console for AI output.</p>
    </div>
  );
};

export default Page;
