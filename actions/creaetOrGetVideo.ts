"use server";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag, FeatureFlagEvents } from "@/features/flags";
import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";

export interface VideoResponse {
  success: boolean;
  data?: Doc<"videos">;
  error?: string;
}

export const createOrGetVideo = async (
  videoId: string,
  userId: string
): Promise<VideoResponse> => {
  console.log("createOrGetVideo called with:", { videoId, userId });
  const convex = getConvexClient();
  const user = await currentUser();

  if (!user) {
    console.error("User not found in createOrGetVideo");
    return {
      success: false,
      error: "User not found",
    };
  }

  console.log("Checking feature usage limit");
  const featureCheck = await checkFeatureUsageLimit(
    user.id,
    FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
  );
  console.log("Feature check result:", featureCheck);

  if (!featureCheck.success) {
    console.error("Feature usage limit exceeded:", featureCheck.error);
    return {
      success: false,
      error: featureCheck.error,
    };
  }

  try {
    console.log("Querying for existing video");
    const video = await convex.query(api.videos.getVideoById, {
      videoId,
      userId,
    });
    console.log("Existing video check result:", video ? "Found" : "Not found");

    if (!video) {
      // Analyze event
      console.log(`Analyze event for video ${videoId} - Token will be spent`);

      console.log("Creating new video entry");
      const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
        videoId,
        userId,
      });
      console.log("New video created with ID:", newVideoId);

      console.log("Fetching new video data");
      const newVideo = await convex.query(api.videos.getVideoById, {
        videoId: newVideoId,
        userId,
      });
      console.log("New video data:", newVideo);

      console.log("Tracking analyse video event...");
      try {
        // Make sure this tracking event is actually firing and completing
        console.log(
          `Sending track event: ${
            FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
          } for user ${userId}`
        );

        await client.track({
          event: FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event,
          company: {
            id: userId,
          },
          user: {
            id: userId,
          },
          // Add a timestamp to ensure the event is unique
          // properties: {
          //   timestamp: new Date().toISOString(),
          //   videoId: videoId,
          // },
        });

        console.log("✅ Video analysis usage tracking completed successfully");
      } catch (trackingError) {
        // Log the error but don't fail the whole function
        console.error("Error tracking video analysis usage:", trackingError);
      }

      return {
        success: true,
        data: newVideo,
      };
    } else {
      console.log("Video exists - no token needs to be spent");
      return {
        success: true,
        data: video,
      };
    }
  } catch (error) {
    console.error("Error creating or getting video", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};

// export const createOrGetVideo = async (
//   videoId: string,
//   userId: string
// ): Promise<VideoResponse> => {
//   const convex = getConvexClient();
//   const user = await currentUser();

//   if (!user) {
//     return {
//       success: false,
//       error: "User not found",
//     };
//   }

//   const featureCheck = await checkFeatureUsageLimit(
//     user.id,
//     FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
//   );

//   if (!featureCheck.success) {
//     return {
//       success: false,
//       error: featureCheck.error,
//     };
//   }

//   try {
//     const video = await convex.query(api.videos.getVideoById, {
//       videoId,
//       userId,
//     });

//     if (!video) {
//       // Analyze event
//       console.log(`Analyze event for video ${videoId} - Token will be spent`);

//       const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
//         videoId,
//         userId,
//       });

//       const newVideo = await convex.query(api.videos.getVideoById, {
//         videoId: newVideoId,
//         userId,
//       });

//       console.log("Tracking analyse video event...");
//       await client.track({
//         event: FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event,
//         company: {
//           id: userId,
//         },
//         user: {
//           id: userId,
//         },
//       });

//       return {
//         success: true,
//         data: newVideo,
//       };
//     } else {
//       console.log("Video exists - no token needs to be spent");
//       return {
//         success: true,
//         data: video,
//       };
//     }
//   } catch (error) {
//     console.error("Error creating or getting video", error);
//     return {
//       success: false,
//       error: "An unexpected error occured. please try again later.",
//     };
//   }
// };

// "use server";

// import { api } from "@/convex/_generated/api";
// import { Doc } from "@/convex/_generated/dataModel";
// import { FeatureFlag, FeatureFlagEvents } from "@/features/flags";
// import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
// import { getConvexClient } from "@/lib/convex";
// import { client } from "@/lib/schematic";
// import { currentUser } from "@clerk/nextjs/server";

// export interface VideoResponse {
//   success: boolean;
//   data?: Doc<"videos">;
//   error?: string;
// }

// export const createOrGetVideo = async (
//   videoId: string,
//   userId: string
// ): Promise<VideoResponse> => {
//   const convex = getConvexClient();
//   const user = await currentUser();

//   if (!user) {
//     return {
//       success: false,
//       error: "User not found",
//     };
//   }

//   const featureCheck = await checkFeatureUsageLimit(
//     user.id,
//     FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
//   );

//   if (!featureCheck.success) {
//     return {
//       success: false,
//       error: featureCheck.error,
//     };
//   }

//   try {
//     const video = await convex.query(api.videos.getVideoById, {
//       videoId,
//       userId,
//     });

//     if (!video) {
//       // Analyze event
//       console.log(`Analyze event for video ${videoId} - Token will be spent`);

//       const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
//         videoId,
//         userId,
//       });

//       const newVideo = await convex.query(api.videos.getVideoById, {
//         videoId: newVideoId,
//         userId,
//       });

//       console.log("Tracking analyse video event...");
//       try {
//         // Make sure this tracking event is actually firing and completing
//         console.log(
//           `Sending track event: ${
//             FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
//           } for user ${userId}`
//         );

//         await client.track({
//           event: FeatureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event,
//           company: {
//             id: userId,
//           },
//           user: {
//             id: userId,
//           },
//           // Add a timestamp to ensure the event is unique
//           properties: {
//             timestamp: new Date().toISOString(),
//             videoId: videoId,
//           },
//         });

//         console.log("✅ Video analysis usage tracking completed successfully");
//       } catch (trackingError) {
//         // Log the error but don't fail the whole function
//         console.error("Error tracking video analysis usage:", trackingError);
//       }

//       return {
//         success: true,
//         data: newVideo,
//       };
//     } else {
//       console.log("Video exists - no token needs to be spent");
//       return {
//         success: true,
//         data: video,
//       };
//     }
//   } catch (error) {
//     console.error("Error creating or getting video", error);
//     return {
//       success: false,
//       error: "An unexpected error occured. please try again later.",
//     };
//   }
// };
