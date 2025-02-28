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
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <AnalyzeButton />
      </Form>
    </div>
  );
}
