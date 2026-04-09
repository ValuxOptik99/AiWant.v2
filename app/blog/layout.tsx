"use client";

import { useEffect } from "react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.background, body: body.style.background };

    html.style.background = "var(--color-midnight)";
    body.style.background = "var(--color-midnight)";

    return () => {
      html.style.background = prev.html;
      body.style.background = prev.body;
    };
  }, []);

  return <>{children}</>;
}
