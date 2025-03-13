"use server";
import { api } from "@/convex/_generated/api";
import { FeatureFlag, FeatureFlagEvents } from "@/features/flags";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Innertube } from "youtubei.js";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export interface TrascriptEntry {
  text: string;
  timestamp: string;
}

const youtube = await Innertube.create({
  lang: "en",
  location: "US",
  retrieve_player: false,
});

function formatTimestamp(start_ms: number): string {
  const minutes = Math.floor(start_ms / 60000);
  const seconds = Math.floor((start_ms % 60000) / 1000);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

async function fetchTranscript(videoId: string): Promise<TrascriptEntry[]> {
  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();
    const transcript: TrascriptEntry[] =
      transcriptData.transcript.content?.body?.initial_segments?.map(
        (segment) => ({
          text: segment.snippet.text ?? "N/A",
          timestamp: formatTimestamp(Number(segment.start_ms)),
        })
      ) ?? [];
    return transcript;
  } catch (error) {
    console.error("Error fetching transcript", error);
    throw error;
  }
}

export async function getYoutubeTranscript(videoId: string) {
  console.log("🎬 Starting YouTube transcript fetch process");
  const user = await currentUser();

  if (!user?.id) {
    console.log("❌ Authentication error: No user found");
    throw new Error("User Not Found");
  }

  console.log("👤 Fetching transcript for user:", user.id);
  console.log("🎥 Fetching transcript for video:", videoId);

  console.log("🔍 Checking database for existing transcript...");
  //   Check if the transcript already exists in database (is it cached?)
  const existingTranscript = await convex.query(
    api.transcript.getTranscriptByVideoId,
    { videoId, userId: user.id }
  );

  if (existingTranscript) {
    console.log("✅ Transcript found in database cache");
    console.log(
      `📊 Transcript length: ${existingTranscript.transcript.length} segments`
    );
    return {
      transcript: existingTranscript.transcript,
      cache:
        "this video has already been transcribed - Accessing cached trnascript instead of using a token",
    };
  }

  console.log("🔄 No cached transcript found, fetching from YouTube API...");
  try {
    console.log("📡 Calling YouTube transcript API");
    const transcript = await fetchTranscript(videoId);
    console.log(`📊 Received transcript with ${transcript.length} segments`);

    console.log("💾 Storing transcript in database");
    // store transcript in database
    await convex.mutation(api.transcript.storeTranscript, {
      videoId,
      userId: user.id,
      transcript,
    });
    console.log("✅ Transcript successfully stored in database");

    console.log("📈 Tracking feature usage");
    await client.track({
      event: FeatureFlagEvents[FeatureFlag.TRANSCRIPTION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });
    console.log("✅ Usage tracking completed");

    return {
      transcript,
      cache:
        "this video was transcribed using a token, the transcipt is not saved in the database",
    };
  } catch (error) {
    console.error("❌ Error fetching transcript:", error);
    console.log("⚠️ Returning empty transcript due to error");
    return {
      transcript: [],
      cache: "Error fetching transcript, please try again later",
    };
  }
}
