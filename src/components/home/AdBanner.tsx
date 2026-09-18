import React from "react";

interface AdBannerProps {
  slot: "top_banner" | "between_sections" | "sidebar" | "article_middle";
  imageUrl?: string;
  linkUrl?: string;
}

export function AdBanner({ slot, imageUrl, linkUrl }: AdBannerProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <aside
      className="w-full max-w-7xl mx-auto px-4 my-4 flex justify-center"
      aria-label="Advertisement Banner"
    >
      <a href={linkUrl || "#"} target="_blank" rel="noopener noreferrer nofollow">
        <img src={imageUrl} alt="Advertisement" className="max-w-full h-auto rounded" />
      </a>
    </aside>
  );
}
