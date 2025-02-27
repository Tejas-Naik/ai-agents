"use client";

import { Button } from "@/components/ui/button";

export default function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6"
        >
          Analyze
        </Button>
      </form>
    </div>
  );
}
