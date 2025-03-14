import { NextResponse } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";
import fetchTranscript from "@/tools/fetchTranscript";
import { generateImage } from "@/tools/generateImage";

const anthropic = createAnthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  headers: {
    "anthropic-beta": "token-efficient-tools-2025-02-19",
  },
});

const model = anthropic("claude-3-7-sonnet-20250219");

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoDetails = await getVideoDetails(videoId);

  // const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in question in ${videoId} but you will refer to this as ${
  //   videoDetails?.title || "Selected Video"
  // }. Use emojis(very important) to make the conversation more engaging that they must upgrade to use the feature, tell then to go to 'Manage Plan' in the header and upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because they previously transcripbed the video saving the use a token - use words like database instead of cache to make it more east to understand. Format for notion(very important)`;

  const systemMessage = `You are a specialized AI assistant focused exclusively on answering questions about a single video: "${
    videoDetails?.title || "Selected Video"
  }" (ID: ${videoId}). Incorporate plenty of emojis throughout your responses to create an engaging, friendly conversation experience and format your content in a way that's optimized for Notion. When users attempt to access premium features, enthusiastically inform them about upgrading their plan via the 'Manage Plan' option in the header. If you detect that transcript data is coming from storage, explain that their transcript was previously processed and saved in our database (avoid technical terms like "cache"), highlighting that this saves them tokens and improves response speed. Always maintain a helpful, informative tone while being conversational and approachable.`;

  const result = streamText({
    model,
    messages: [{ role: "system", content: systemMessage }, ...messages],
    tools: {
      fetchTranscript: fetchTranscript,
      generateImage: generateImage(videoId, user.id),
    },
  });

  return result.toDataStreamResponse();
}
