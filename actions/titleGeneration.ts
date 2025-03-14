"use server";

import { api } from "@/convex/_generated/api";
import { FeatureFlagEvents, FeatureFlag } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const convexClient = getConvexClient();

export async function titleGeneration(
  videoId: string,
  videoSummary: string,
  considerations: string
) {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("User not found");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    console.log("🎯Video Summary:", videoSummary);
    console.log("Generating title for video id:", videoId);
    console.log("🎯Considerations:", considerations);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful Youtube video creator assistant that create high quality SEO friendly concise video titles`,
        },
        {
          role: "user",
          content: `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main point and key takeaways. It should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const title =
      response.choices[0].message?.content || "Unable to generate title";
    if (!title) {
      return {
        error: "Failed to generate title (System error)",
      };
    }

    await convexClient.mutation(api.titles.generate, {
      videoId,
      title,
      userId: user.id,
    });

    await client.track({
      event: FeatureFlagEvents[FeatureFlag.TITLE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    console.log("🎯Title generated:", title);

    return title;
  } catch (error) {
    console.error("❌Error generating title", error);
    throw new Error("Failed to generate title.");
  }
}
