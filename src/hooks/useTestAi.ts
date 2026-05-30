import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

type DailyData = {
  precipitation_sum: number[];
  rain_sum: number[];
  snowfall_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: Date[];
};

const categories = ["clothing", "electronics", "toiletries", "miscellaneous"];

export const useTestAi = (daily: DailyData) => {
  const [data, setData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");

  useEffect(() => {
    const fetchResponse = async () => {
      if (!daily) {
        return;
      }
      try {
        setIsLoading(true);
        setError("");

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Based on this weather data: ${JSON.stringify(daily)}, create a packing list. Return the response as a JSON array following this structure: [{itemName: string, category: category from ${categories}, reason: string, quantity: number}]. State the reason according to the weather pattern. Include only ${categories} categories. Make sure each category has at around 10 items. Return ONLY the JSON. Do not include any markdown formatting.`,
        });

        const fullContent = response.text;

        if (fullContent) {
          try {
            const jsonMatch = fullContent.match(/\[[\s\S]*\]/);
            const jsonString = jsonMatch ? jsonMatch[0] : fullContent;
            const data = JSON.parse(jsonString);
            setData(data);
          } catch (parseError) {
            console.error("Could not parse the response", parseError);
            setError("Could not parse the AI response");
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponse();
  }, [daily]);

  return { data, isLoading, error };
};
