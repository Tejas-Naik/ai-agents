"use client";

import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}

function Transcription({ videoId }: { videoId: string }) {
  const [transcript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);
  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );
  console.log(videoId, featureUsageExceeded);
  return (
    <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4">
      {transcript ? (
        transcript.transcript.map((entry, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-sm text-gray-400 min-w-[50px]">
              {entry.timestamp}
            </span>
            <p className="text-sm text-gray-700">{entry.text}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No transcription available.</p>
      )}
    </div>
  );
}

export default Transcription;
