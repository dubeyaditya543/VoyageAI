import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import type { Place } from "../components/FamousPlaceCard";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const usePlaces = (city: CityFetch | null) => {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>("");

  useEffect(() => {
    const fetchResponse = async () => {
      if (!city) {
        setPlaces(null);
        setIsLoading(false);
        setError("");
        return;
      }
      try {
        setIsLoading(true);
        setError("");

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Based on ${JSON.stringify(city)} return an array of 8 objects only:
[
  {
    id: number,
    name: string,
    description: string,
    rating: number,          // 0‑5
    about_place_link: string             // Wikipedia
  },
  …
]
Return ONLY the JSON. If a real image cannot be found, set imageLink to "".
`,
        });

        const fullContent = response.text;

        if (fullContent) {
          try {
            const jsonMatch = fullContent.match(/\[[\s\S]*\]/);
            const jsonString = jsonMatch ? jsonMatch[0] : fullContent;
            const data = JSON.parse(jsonString);
            setPlaces(data);
          } catch (parseError) {
            console.error("Failed to parse JSON from AI response:", parseError);
            setError("Failed to parse the response from the AI.");
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponse();
  }, [city]);

  return { places, isLoading, error };
};

