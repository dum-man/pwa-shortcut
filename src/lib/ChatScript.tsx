"use client";

import Script from "next/script";
import { useState } from "react";

const ChatScript = () => {
  const [firstScriptLoaded, setFirstScriptLoaded] = useState(false);

  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    return (
      <>
        <Script
          src="https://widget.whelp.co/app.js"
          strategy="afterInteractive"
          onLoad={() => setFirstScriptLoaded(true)}
        />
        {firstScriptLoaded && (
          <Script
            id="whelp"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                Whelp("init", {
                  app_id: "e794bd8cfbd467a87a01c1e7fd3dab29",
                });
              `,
            }}
          />
        )}
      </>
    );
  }

  return null;
};

export default ChatScript;
