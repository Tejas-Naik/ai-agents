"use client";

import { useUser } from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { useEffect } from "react";

function SchematicWrapped({ children }: { children: React.ReactNode }) {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const userName =
      user?.username ?? user?.fullName ?? user?.emailAddresses[0]?.emailAddress;

    if (user?.id) {
      identify({
        // Company level key
        company: {
          keys: {
            id: user.id,
          },
          name: userName,
        },

        // User level keys
        keys: {
          id: user.id,
        },
        name: userName,
      });
    }
  }, [user, identify]);

  return children;
}

export default SchematicWrapped;
