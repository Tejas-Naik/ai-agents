// import { dalleImageGeneration } from "@/actions/dalleImageGeneration";
// import { FeatureFlag } from "@/features/flags";
// import { client } from "@/lib/schematic";
// import { tool } from "ai";
// import { z } from "zod";

// export const generateImage = (videoId: string, userId: string) =>
//   tool({
//     description: "Generate an image",
//     parameters: z.object({
//       prompt: z.string().describe("The prompt to image an generation"),
//       videoId: z.string().describe("The YouTube video ID"),
//     }),
//     execute: async ({ videoId }) => {
//       const schematicCtx = {
//         company: { id: userId },
//         user: { id: userId },
//       };

//       const isImageGenerationEnabled = await client.checkFlag(
//         schematicCtx,
//         FeatureFlag.IMAGE_GENERATION
//       );

//       if (!isImageGenerationEnabled) {
//         return {
//           error: "Image generation is not enabled, the user must upgrade",
//         };
//       }

//       const image = await dalleImageGeneration(prompt, videoId);
//       return { image };
//     },
//   });
import { dalleImageGeneration } from "@/actions/dalleImageGeneration";
import { FeatureFlag } from "@/features/flags";
import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";

export const generateImage = (videoId: string, userId: string) =>
  tool({
    description: "Generate an image",
    parameters: z.object({
      prompt: z.string().describe("The prompt to generate an image"),
      videoId: z.string().describe("The YouTube video ID"),
    }),
    execute: async (params) => {
      console.log("🎨 Generate Image Tool Executed with params:", params);

      // Properly extract parameters
      const prompt = params.prompt;
      const videoIdParam = params.videoId || videoId; // Use the parameter or the closure value

      if (!prompt) {
        console.error("❌ Missing prompt for image generation");
        return { error: "No prompt provided for image generation" };
      }

      const schematicCtx = {
        company: { id: userId },
        user: { id: userId },
      };

      const isImageGenerationEnabled = await client.checkFlag(
        schematicCtx,
        FeatureFlag.IMAGE_GENERATION
      );

      if (!isImageGenerationEnabled) {
        console.log("⚠️ Image generation not enabled for user:", userId);
        return {
          error: "Image generation is not enabled, the user must upgrade",
        };
      }

      try {
        console.log(
          `🖼️ Generating image with prompt: "${prompt}" for video: ${videoIdParam}`
        );
        const image = await dalleImageGeneration(prompt, videoIdParam);
        console.log("✅ Image generation successful:", image);
        return { image };
      } catch (error) {
        console.error("❌ Error generating image:", error);
        return {
          error: "Failed to generate image. Please try again.",
          details: error instanceof Error ? error.message : String(error),
        };
      }
    },
  });
