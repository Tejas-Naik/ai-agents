// "use client";

// import { FeatureFlag } from "@/features/flags";
// import { Progress } from "@radix-ui/react-progress";
// import {
//   useSchematicEntitlement,
//   useSchematicIsPending,
// } from "@schematichq/schematic-react";
// import { useEffect, useState } from "react";

// function Usage({
//   featureFlag,
//   title,
//   shouldRefresh = false,
// }: {
//   featureFlag: FeatureFlag;
//   title: string;
//   shouldRefresh?: boolean;
// }) {
//   const isPending = useSchematicIsPending();
//   const [refreshCount, setRefreshCount] = useState(0);

//   // Get the feature entitlement data - this will re-fetch when refreshCount changes
//   const {
//     featureAllocation,
//     featureUsage,
//     value: isFeatureEnabled,
//   } = useSchematicEntitlement(featureFlag);

//   // Force refresh when shouldRefresh changes or component mounts
//   useEffect(() => {
//     console.log(`Usage component refreshing data for ${featureFlag}...`);
//     // Increment refreshCount to trigger a re-render and re-fetch of data
//     setRefreshCount((prev) => prev + 1);

//     // Set up interval to refresh usage data every 5 seconds
//     const refreshInterval = setInterval(() => {
//       console.log(`Refreshing ${featureFlag} usage data...`);
//       setRefreshCount((prev) => prev + 1);
//     }, 5000);

//     return () => clearInterval(refreshInterval);
//   }, [shouldRefresh, featureFlag]);

//   const hasUsedAllToken =
//     featureUsage && featureAllocation && featureUsage >= featureAllocation;

//   if (isPending) {
//     return <div className="text-gray-500 text-center py-4">Loading...</div>;
//   }

//   if (hasUsedAllToken) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//           <div className="px-4 py-2 bg-red-50 rounded-lg">
//             <span className="font-medium text-red-700">{featureUsage}</span>
//             <span className="text-red-400 mx-2">/</span>
//             <span className="font-medium text-red-700">
//               {featureAllocation}
//             </span>
//           </div>
//         </div>

//         <div className="relative">
//           <Progress
//             value={100}
//             className="h-3 rounded-full bg-gray-100 [&>*]:bg-red-600"
//           />
//           <p className="text-sm text-red-600 mt-2">
//             You have used all available tokens. Please upgrade your plan to
//             continue using this feature.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!isFeatureEnabled) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-50">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//           <div className="px-4 py-2 bg-gray-50 rounded-lg">
//             <span className="font-medium text-red-700">Feature Disabled</span>
//           </div>
//         </div>

//         <div className="relative">
//           <Progress value={0} className="h-3 rounded-full bg-gray-100" />
//           <p className="text-sm text-gray-600 mt-2">
//             Upgrade to use this feature
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;
//   const getProgressColor = (progress: number) => {
//     if (progress >= 80) return "[&>*]:bg-red-600";
//     if (progress >= 50) return "[&>*]:bg-yellow-600";
//     return "[&>*]:bg-green-600";
//   };

//   const progressColor = getProgressColor(progress);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4 gap-4">
//         <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//         <div className="px-4 py-2 bg-red-50 rounded-lg">
//           <span className="font-medium text-gray-700">{featureUsage || 0}</span>
//           <span className="text-red-400 mx-2">/</span>
//           <span className="font-medium text-gray-700">
//             {featureAllocation || 0}
//           </span>
//         </div>
//       </div>

//       <div className="relative">
//         <Progress
//           value={progress}
//           className={`h-3 rounded-full bg-gray-100 ${progressColor}`}
//         />

//         {progress >= 100 ? (
//           <p className="text-sm text-red-600 mt-2">
//             You have reached your usage limit
//           </p>
//         ) : progress >= 80 ? (
//           <p className="text-sm text-yellow-600 mt-2">
//             You are close to your usage limit
//           </p>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default Usage;

import { FeatureFlag } from "@/features/flags";
import { Progress } from "@radix-ui/react-progress";
import {
  useSchematicEntitlement,
  useSchematicIsPending,
} from "@schematichq/schematic-react";
import { useEffect, useState } from "react";

function Usage({
  featureFlag,
  title,
  shouldRefresh = false,
}: {
  featureFlag: FeatureFlag;
  title: string;
  shouldRefresh?: boolean;
}) {
  const isPending = useSchematicIsPending();
  const [refreshCount, setRefreshCount] = useState(0);
  // Add state to track progress width for animation
  const [progressWidth, setProgressWidth] = useState(0);

  // Get the feature entitlement data - this will re-fetch when refreshCount changes
  const {
    featureAllocation,
    featureUsage,
    value: isFeatureEnabled,
  } = useSchematicEntitlement(featureFlag);

  // Force refresh when shouldRefresh changes or component mounts
  useEffect(() => {
    console.log(`Usage component refreshing data for ${featureFlag}...`);
    // Increment refreshCount to trigger a re-render and re-fetch of data
    setRefreshCount((prev) => prev + 1);

    // Set up interval to refresh usage data every 5 seconds
    const refreshInterval = setInterval(() => {
      console.log(`Refreshing ${featureFlag} usage data...`);
      setRefreshCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, [shouldRefresh, featureFlag]);

  // Calculate progress and update progressWidth when featureUsage or featureAllocation changes
  useEffect(() => {
    const calculatedProgress =
      ((featureUsage || 0) / (featureAllocation || 1)) * 100;
    // Update progressWidth with animation
    setProgressWidth(calculatedProgress);
  }, [featureUsage, featureAllocation]);

  const hasUsedAllToken =
    featureUsage && featureAllocation && featureUsage >= featureAllocation;

  if (isPending) {
    return <div className="text-gray-500 text-center py-4">Loading...</div>;
  }

  if (hasUsedAllToken) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="px-4 py-2 bg-red-50 rounded-lg">
            <span className="font-medium text-red-700">{featureUsage}</span>
            <span className="text-red-400 mx-2">/</span>
            <span className="font-medium text-red-700">
              {featureAllocation}
            </span>
          </div>
        </div>

        <div className="relative">
          <Progress
            value={100}
            className="h-3 rounded-full bg-gray-100 overflow-hidden"
          >
            <div
              className="h-full bg-red-600 transition-all duration-300 ease-in-out"
              style={{ width: "100%" }}
            />
          </Progress>
          <p className="text-sm text-red-600 mt-2">
            You have used all available tokens. Please upgrade your plan to
            continue using this feature.
          </p>
        </div>
      </div>
    );
  }

  if (!isFeatureEnabled) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="px-4 py-2 bg-gray-50 rounded-lg">
            <span className="font-medium text-red-700">Feature Disabled</span>
          </div>
        </div>

        <div className="relative">
          <Progress
            value={0}
            className="h-3 rounded-full bg-gray-100 overflow-hidden"
          >
            <div
              className="h-full transition-all duration-300 ease-in-out"
              style={{ width: "0%" }}
            />
          </Progress>
          <p className="text-sm text-gray-600 mt-2">
            Upgrade to use this feature
          </p>
        </div>
      </div>
    );
  }

  const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-red-600";
    if (progress >= 50) return "bg-yellow-600";
    return "bg-green-600";
  };

  const progressColor = getProgressColor(progress);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="px-4 py-2 bg-red-50 rounded-lg">
          <span className="font-medium text-gray-700">{featureUsage || 0}</span>
          <span className="text-red-400 mx-2">/</span>
          <span className="font-medium text-gray-700">
            {featureAllocation || 0}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Use a key to force re-rendering when values change */}
        <Progress
          key={`progress-${refreshCount}-${featureUsage}`}
          value={progressWidth}
          className="h-3 rounded-full bg-gray-100 overflow-hidden"
        >
          <div
            className={`h-full ${progressColor} transition-all duration-300 ease-in-out`}
            style={{ width: `${progressWidth}%` }}
          />
        </Progress>

        {progress >= 100 ? (
          <p className="text-sm text-red-600 mt-2">
            You have reached your usage limit
          </p>
        ) : progress >= 80 ? (
          <p className="text-sm text-yellow-600 mt-2">
            You are close to your usage limit
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Usage;
