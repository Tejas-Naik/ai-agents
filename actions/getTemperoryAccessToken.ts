"use server";

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_SECRET_KEY;

if (!apiKey) {
  throw new Error("Missing Schematic secret key");
}

const client = new SchematicClient({
  apiKey,
});

export async function getTemperoryAccessToken() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const response = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: {
      id: user.id,
    },
  });

  return response.data.token;
}
