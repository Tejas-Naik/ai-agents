if (!process.env.CLERK_ISSUER_URL) {
  throw new Error("CLERK_ISSUER_URL is not setin env variables");
}

const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_ISSUER_URL,
      applicationID: "convex",
    },
  ],
};

export default authConfig;
