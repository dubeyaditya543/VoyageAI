import Groq from "groq-sdk";
import { useEffect, useState } from "react";
import type { PackingItem } from "../types";
const groq = new Groq({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});

type DailyData = {
  precipitation_sum: number[];
  rain_sum: number[];
  snowfall_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: Date[];
};

const categories = ["clothing","electronics","toiletries","miscellaneous"]

export const useAi = (daily: DailyData) => {
  const [response, setResponse] = useState<PackingItem[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");

  useEffect(() => {
    const fetchResponse = async () => {
      if(!daily) return;
      try {
        setLoading(true);
        setError("")
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Based on this weather data: ${JSON.stringify(daily)}, create a packing list. Return the response as a JSON array following this structure: [{itemName: string, category: category from ${categories}, reason: string (descriptive based on the weather data), quantity: number}]. State the reason according to the weather pattern. Include only ${categories} categories. Make sure each category has a minimum of 10 items and at max 13 items. Return ONLY the JSON. Do not include any markdown formatting.`,
            },
          ],
        });
        const data = completion.choices[0]?.message?.content
          ? JSON.parse(completion.choices[0]?.message?.content)
          : null;
        if (data) {
          setResponse(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponse();
  }, [daily]);

  return { response, isLoading, error };
};
