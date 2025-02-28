"use client";

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { Copy } from "lucide-react";

function TitleGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const titles: {title: string; _id: string}[] = [];

  const { value: isTitleGenerationEnabled } = useSchematicEntitlement(
    FeatureFlag.TITLE_GENERATION
  );

  const copyToClipboard = (title: string) => {
    navigator.clipboard.writeText(title);
    // toast.success("Copied to Clipboard")
  };

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="min-w-52">
        <Usage featureFlag={FeatureFlag.TITLE_GENERATION} title="Titles" />
      </div>

      <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto">
        {titles?.map((title) => (
          <div
            key={title._id}
            className="group relative p-4 border border-gray-100 rounded-lg border-gray-50 hover:border-blue-100 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                {title.title}
              </p>

              <button onClick={() => copyToClipboard(title.title)}>
                <Copy className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No titles generated */}
      {!titles?.length && !!isTitleGenerationEnabled && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
          <p className="text-sm text-gray-400 mt-1">
            No titles have been generated yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default TitleGeneration;
