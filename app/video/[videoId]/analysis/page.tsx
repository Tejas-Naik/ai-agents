"use client";

import { createOrGetVideo } from "@/actions/creaetOrGetVideo";
import AiAgentChat from "@/components/AiAgentChat";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGeneration from "@/components/TitleGeneration";
import Transcription from "@/components/Transcription";
import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag } from "@/features/flags";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;
  const { user, isLoaded, isSignedIn } = useUser();
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );
  const [fetchAttempted, setFetchAttempted] = useState(false);

  // Add debug for auth state
  console.log("Auth state:", { isLoaded, isSignedIn, userId: user?.id });

  useEffect(() => {
    console.log(
      `useEffect triggered with videoId: ${videoId} and auth state:`,
      {
        isLoaded,
        isSignedIn,
        userId: user?.id,
      }
    );

    // Only proceed if auth is loaded and user is signed in
    if (!isLoaded || !isSignedIn || !user?.id) {
      console.log("Auth is not ready yet or user is not signed in. Waiting...");
      return;
    }

    // Avoid duplicate API calls
    if (fetchAttempted) {
      console.log("Fetch already attempted, skipping...");
      return;
    }

    const fetchVideo = async () => {
      try {
        console.log("Starting to fetch video with:", {
          videoId,
          userId: user.id,
        });

        setFetchAttempted(true);

        const response = await createOrGetVideo(videoId as string, user.id);
        console.log("API Response:", response);

        if (!response.success) {
          console.error("Error creating or getting video:", response.error);
          setVideo(null);
        } else if (!response.data) {
          console.error("API call succeeded but no video data returned");
          setVideo(null);
        } else {
          console.log("Setting video data:", response.data);
          setVideo(response.data);

          if (!response.data._creationTime) {
            console.log(
              "This appears to be a new video entry, consumption should be updated"
            );
          } else {
            console.log(
              "This is an existing video, consumption should not increase"
            );
          }
        }
      } catch (error) {
        console.error("Unexpected error in fetchVideo:", error);
        setVideo(null);
      }
    };

    console.log("Auth is ready. Starting fetchVideo call...");
    fetchVideo();
  }, [videoId, isLoaded, isSignedIn, user, fetchAttempted]);

  console.log("Current video state:", video);

  const videoTranscriptionStatus =
    video === undefined ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-700">Loading...</span>
      </div>
    ) : !video ? (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-gray-200 rounded-full">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <p className="text-sm text-amber-700">
          This is your first time analysing this video. <br />
          <span className="font-semibold">(1 analysis token being used)</span>
        </p>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-sm text-green-700">
          Analysis exists for this video - no additional tokens needed in future
          calls. <br />
        </p>
      </div>
    );

  return (
    <div className="pt-20 xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6">
          {/* Analysis Section */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <Usage
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title="Analyse Video"
            />
            {/* Video Transctiption status */}
            {videoTranscriptionStatus}
          </div>
          {/* Youtube Video details */}
          <YoutubeVideoDetails videoId={videoId} />

          {/* Thumbnail Generation */}
          <ThumbnailGeneration videoId={videoId} />

          {/* Title Generation */}
          <TitleGeneration videoId={videoId} />

          {/* Transcription */}
          <Transcription videoId={videoId} />
        </div>
        {/* Right Side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          {/* AI Agent Chat Box */}
          <AiAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
