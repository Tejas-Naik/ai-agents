import { getTemperoryAccessToken } from "@/actions/getTemperoryAccessToken";
import SchematicEmbed from "./SchematicEmbed";

async function SchematicComponent({ 
  componentId 
}: { 
  componentId: string;
}) {
  if (!componentId) {
    return null;
  }

  // Get access token
  const accessToken = await getTemperoryAccessToken();

  if (!accessToken) {
    throw new Error("Missing access token");
  }

  return (
    <SchematicEmbed 
      accessToken={accessToken} 
      componentId={componentId}
    />
  );
}

export default SchematicComponent;
