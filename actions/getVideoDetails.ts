"use server";

import { google } from "googleapis";
import { VideoDetails } from "@/types/types";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoDetails(videoId: string) {
  console.log("📽️Fetching video details for:", videoId);
  try {
    // Fetch video details and channel details
    const videoResponse = await youtube.videos.list({
      part: ["statistics", "snippet"],
      id: [videoId],
    });

    const videoDetails = videoResponse.data.items?.[0];

    if (!videoDetails) throw new Error("Video not found");

    // Get channel details including thumbnail
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
      key: process.env.YOUTUBE_API_KEY,
    });

    const channelDetails = channelResponse.data.items?.[0];

    console.log("✅ Video details fetched succussfully");

    const video: VideoDetails = {
      title: videoDetails.snippet?.title || "Unknown title",
      thumbnail:
        videoDetails.snippet?.thumbnails?.default?.url ||
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        videoDetails.snippet?.thumbnails?.high?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      // Video Metrics
      views: videoDetails.statistics?.viewCount || "0",
      likes: videoDetails.statistics?.likeCount || "Not available",
      comments: videoDetails.statistics?.commentCount || "Not available",

      // Channel Details
      channel: {
        title: videoDetails.snippet?.channelTitle || "Unknown channel",
        thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
        subscribers: Number(channelDetails?.statistics?.subscriberCount || "0"),
      },
    };

    return video;
  } catch (error) {
    console.error("❌ Fetching video details:", error);
  }
}
