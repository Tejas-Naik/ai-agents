// This will load the transcription automatically when the user comes to this page
"use client";

import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState, useEffect } from "react";
import Usage from "./Usage";
// Import the function but don't destructure it - this is the correct way to use a Server Action
import * as TranscriptActions from "@/actions/getYoutubeTranscript";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}

function Transcription({ videoId }: { videoId: string }) {
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { value: isTranscriptionEnabled, featureUsageExceeded } =
    useSchematicEntitlement(FeatureFlag.TRANSCRIPTION);

  useEffect(() => {
    async function fetchTranscript() {
      if (!videoId || !isTranscriptionEnabled || featureUsageExceeded) return;

      try {
        setIsLoading(true);
        // Call the server action using the imported module
        const result = await TranscriptActions.getYoutubeTranscript(videoId);
        setTranscript(result);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTranscript();
  }, [videoId, isTranscriptionEnabled, featureUsageExceeded]);

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="min-w-52">
        <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />
      </div>

      <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8 px-4">
            <p className="text-sm text-gray-400">Loading transcript...</p>
          </div>
        ) : transcript && transcript.transcript.length > 0 ? (
          transcript.transcript.map((entry, index) => (
            <div
              key={index}
              className="group relative p-4 border border-gray-100 rounded-lg border-gray-50 hover:border-blue-100 hover:bg-blue-50 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="text-sm text-gray-400 min-w-[60px]">
                  {entry.timestamp}
                </span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {entry.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
            <p className="text-sm text-gray-400 mt-1">
              {!isTranscriptionEnabled
                ? "Transcription feature is not enabled."
                : featureUsageExceeded
                ? "You've reached your transcription limit."
                : "No transcription available for this video."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transcription;
