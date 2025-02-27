"use client";

import { useFormStatus } from "react-dom";
function AnalyzeButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {pending ? "Analyzing..." : "Analyze"}
    </button>
  );
}

export default AnalyzeButton;
