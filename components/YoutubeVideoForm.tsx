"use client";

import Form from "next/form";
import AnalyzeButton from "./AnalyzeButton";
import { analyseYoutubeVideo } from "@/actions/analyseYoutubeVideo";

export default function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form action={analyseYoutubeVideo} className="flex gap-2">
        <input
          name="url"
          type="text"
          placeholder="Enter YouTube URL"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 shadow-sm"
        />
        <AnalyzeButton />
      </Form>
    </div>
  );
}
