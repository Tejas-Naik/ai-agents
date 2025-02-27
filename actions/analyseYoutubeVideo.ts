"use server";

import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  if (!url) return;

  //   const videoId = getVideoIdFromUrl(url);
  const videoId = "abc";
  if (!videoId) return;

  //   Redirect to the new post
  redirect(`/video/${videoId}/analysis`);
}
