export function getVideoIdFromUrl(url: string): string | null {
  let videoId: string | null = null;
  if (url.includes("youtu.be/")) {
    // Shortened URL Format: https://youtu.be/abcdef123
    videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || null;
  } else if (url.includes("youtube.com/shorts/")) {
    // Shortened URL Format: https://www.youtube.com/shorts/abcdef123
    videoId = url.split("shorts/")[1]?.split(/[?#]/)[0] || null;
  } else if (url.includes("v=")) {
    // Standard URL Format: https://www.youtube.com/watch?v=abcdef123
    videoId = url.split("v=")[1]?.split("&")[0] || null;
  }

  return videoId;
}
