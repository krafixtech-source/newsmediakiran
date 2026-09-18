"use client";

import React, { useState } from "react";
import { MessageCircle, Link2, Check, Share2 } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/common/SocialIcons";

interface StickyShareBarProps {
  title: string;
  url: string;
}

export function StickyShareBar({ title, url }: StickyShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <>
      {/* Desktop Sticky Sidebar (Left of article) */}
      <div className="hidden lg:flex flex-col items-center gap-3 sticky top-32">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 -rotate-90 my-4">
          SHARE
        </span>

        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#25D366] hover:scale-110 text-white flex items-center justify-center shadow-sm transition-all"
          aria-label="Share on WhatsApp"
          title="व्हाट्सएप पर शेयर करें"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#1877F2] hover:scale-110 text-white flex items-center justify-center shadow-sm transition-all"
          aria-label="Share on Facebook"
          title="फेसबुक पर शेयर करें"
        >
          <FacebookIcon className="w-5 h-5 fill-white" />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black hover:scale-110 text-white flex items-center justify-center shadow-sm transition-all"
          aria-label="Share on X"
          title="X पर शेयर करें"
        >
          <TwitterIcon className="w-4 h-4 fill-white" />
        </a>

        <button
          onClick={handleCopy}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:scale-110 flex items-center justify-center shadow-sm transition-all cursor-pointer"
          aria-label="Copy Link"
          title="लिंक कॉपी करें"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Link2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Bottom Fixed Share Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2.5 px-4 z-40 flex items-center justify-between shadow-lg">
        <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
          <Share2 className="w-4 h-4 text-[#b91c1c]" />
          <span>शेयर करें:</span>
        </span>

        <div className="flex items-center gap-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs"
          >
            <FacebookIcon className="w-4 h-4 fill-white" />
          </a>

          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-medium text-gray-700 flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{copied ? "कॉपी हुआ!" : "कॉपी"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
