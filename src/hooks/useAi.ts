import Groq from "groq-sdk";
import { useEffect, useState } from "react";
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

const categories = ["Clothing","Electronics","Toiletries","Miscellaneous"]

export const useAi = (daily: DailyData) => {
  const [response, setResponse] = useState<PackingResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");

  useEffect(() => {
    const fetchResponse = async () => {
      if(!daily) return;
      try {
        setLoading(true);
        setError("")
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `Based on this weather data: ${JSON.stringify(daily)}, create a packing list. Return the response as a JSON object following this structure: { trip_summary: string, packing_categories: [{ category: string, items: [{ name: string, quantity: string, reason: string, importance: string, packed: boolean }] }] }. Include only ${categories} categories. Return ONLY the JSON. Do not include any markdown formatting. Also for every item in packing_categories make sure the default value is false for the packed state`,
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
