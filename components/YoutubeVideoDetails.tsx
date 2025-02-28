"use client";

import { VideoDetails } from "@/types/types";
import { useEffect, useState } from "react";
import { getVideoDetails } from "@/actions/getVideoDetails";
import Image from "next/image";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const details = await getVideoDetails(videoId);
        if (!details) throw new Error("Failed to fetch video details");
        setVideo(details);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setVideo(null);
      }
    };
    fetchVideoDetails();
  }, [videoId]);

  if (error) return (
    <div className="bg-red-50 text-red-500 p-4 rounded-lg">
      Error: {error}
    </div>
  );

  if (!video)
    return (
      <div className="flex items-center justify-center">
        <div className="h-5 w-5 border-b-2 border-blue-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="@container bg-white rounded-xl">
      <div className="flex flex-col">
        {/* Video Thumbnail */}
        <div className="flex-shrink-0 @md:w-[280px]">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Video Details */}
        <div className="flex-grow space-y-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight line-clamp-2">
            {video.title}
          </h1>

          {/* Channel Info */}
          <div className="flex items-center gap-4">
            <Image
              src={video.channel.thumbnail}
              alt={video.channel.title}
              width={48}
              height={48}
              className="w-10 h-10 @md:w-12 @md:h-12 rounded-full border-2 border-gray-100"
            />

            <div>
              <p className="text-base @md:text-lg font-semibold text-gray-900">
                {video.channel.title}
              </p>
              <p className="text-sm @md:text-base text-gray-600">
                {video.channel.subscribers.toLocaleString()} subscribers
              </p>
            </div>
          </div>

          {/* Video stats */}
          <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4">
            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Published</p>
              </div>
              <p className="font-medium text-gray-900">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Views</p>
              </div>
              <p className="font-medium text-gray-900">{Number(video.views).toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <p className="font-medium text-gray-900">{video.likes}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Comments</p>
              </div>
              <p className="font-medium text-gray-900">{video.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoDetails;
