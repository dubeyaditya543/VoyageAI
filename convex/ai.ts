import { v } from "convex/values";
import { action } from "./_generated/server";
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";

const categories = ["clothing", "electronics", "toiletries", "miscellaneous"];

export const useAiToFetchPackingList = action({
  args: {
    daily: v.optional(
      v.object({
        precipitation_sum: v.array(v.number()),
        rain_sum: v.array(v.number()),
        snowfall_sum: v.array(v.number()),
        temperature_2m_max: v.array(v.number()),
        temperature_2m_min: v.array(v.number()),
        time: v.array(v.string()),
      }),
    ),
  },
  handler: async (_, args) => {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("api key is not set");
    }
    if (!args.daily) {
      return;
    }
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Based on this weather data: ${JSON.stringify(args.daily)}, create a packing list. Return the response as a JSON array following this structure: [{itemName: string, category: category from ${categories}, reason: string (descriptive based on the weather data), quantity: number}]. State the reason according to the weather pattern. Include only ${categories} categories. Make sure each category has a minimum of 10 items and at max 13 items. Return ONLY the JSON. Do not include any markdown formatting.`,
        },
      ],
    });
    const data = completion.choices[0]?.message?.content
      ? JSON.parse(completion.choices[0]?.message?.content)
      : null;
    return data;
  },
});

export const useAiToFetchFamousPlaces = action({
  args: {
    city: v.optional(
      v.object({
        id: v.number(),
        name: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        elevation: v.optional(v.number()),
        feature_code: v.optional(v.string()),
        country_code: v.string(),
        admin1_id: v.optional(v.number()),
        admin3_id: v.optional(v.number()),
        admin4_id: v.optional(v.number()),
        timezone: v.optional(v.string()),
        population: v.optional(v.number()),
        postcodes: v.optional(v.array(v.string())),
        country_id: v.number(),
        country: v.string(),
        admin1: v.optional(v.string()),
        admin3: v.optional(v.string()),
        admin4: v.optional(v.string()),
      }),
    ),
  },
  handler: async (_, args) => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("No api key");
    }
    if (!args.city || args.city === undefined) {
      return;
    }
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `Based on ${JSON.stringify(args.city)} return an array of 8 objects only:
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
                  Return ONLY the JSON. If a real image cannot be found, set imageLink to "".`,
    });

    const fullContent = response.text;

    if (fullContent) {
      try {
        const jsonMatch = fullContent.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : fullContent;
        const data = JSON.parse(jsonString);
        return data
      } catch (parseError) {
        console.error("Failed to parse JSON from AI response:", parseError);
        return "Failed to parse response to json"
      }
    }
  },
});
