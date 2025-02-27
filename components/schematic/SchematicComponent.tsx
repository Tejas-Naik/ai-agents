import { getTemperoryAccessToken } from "@/actions/getTemperoryAccessToken";
import SchematicEmbed from "./SchematicEmbed";

async function SchematicComponent({ 
  componentId,
  options 
}: { 
  componentId: string;
  options?: {
    currency?: string;
  };
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
      options={options}
    />
  );
}

export default SchematicComponent;
