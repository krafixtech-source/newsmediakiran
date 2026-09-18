"use client";

import React from "react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { BreakingTicker } from "@/components/breaking/BreakingTicker";
import { HeroEditorialGrid } from "@/components/home/HeroEditorialGrid";
import { LatestNewsSection } from "@/components/home/LatestNewsSection";
import { IndiaSection } from "@/components/home/IndiaSection";
import { RajasthanSection } from "@/components/home/RajasthanSection";
import { CrimeSection } from "@/components/home/CrimeSection";
import { GoldAndForexSection } from "@/components/home/GoldAndForexSection";
import { BusinessSection } from "@/components/home/BusinessSection";
import { SportsSection } from "@/components/home/SportsSection";
import { EntertainmentSection } from "@/components/home/EntertainmentSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { ExplainedSection } from "@/components/home/ExplainedSection";
import { MultimediaSection } from "@/components/home/MultimediaSection";
import { InteractiveFeaturesSection } from "@/components/home/InteractiveFeaturesSection";
import { OpinionAndMostReadSection } from "@/components/home/OpinionAndMostReadSection";
import { WhatsAppCTA } from "@/components/home/WhatsAppCTA";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { Footer } from "@/components/footer/Footer";
import { Article } from "@/lib/db/articles";

interface ClientHomepageShellProps {
  featuredArticle: Article;
  topStories: Article[];
  latestArticles: Article[];
  rajasthanArticles: Article[];
  nationalArticles: Article[];
  crimeArticles: Article[];
  businessArticles: Article[];
  sportsArticles: Article[];
  entertainmentArticles: Article[];
  techArticles: Article[];
  mostReadArticles: Article[];
  breakingItems: any[];
}

export function ClientHomepageShell({
  featuredArticle,
  topStories,
  latestArticles,
  rajasthanArticles,
  nationalArticles,
  crimeArticles,
  businessArticles,
  sportsArticles,
  entertainmentArticles,
  techArticles,
  mostReadArticles,
  breakingItems,
}: ClientHomepageShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      {/* 1. Unified 2-Tier Newsroom Header (Hindustan Times Style) */}
      <SiteHeader />

      {/* 4. Breaking News Marquee */}
      <BreakingTicker items={breakingItems} />

      {/* 5. Hero Editorial Grid (65% / 35%) */}
      <HeroEditorialGrid featuredArticle={featuredArticle} topStories={topStories} />

      {/* 6. Latest News (Mixed Layout) */}
      <LatestNewsSection articles={latestArticles} />

      {/* 7. Rajasthan Regional Bureau with City Tabs */}
      <RajasthanSection articles={rajasthanArticles} />

      {/* 8. India / National Affairs */}
      <IndiaSection articles={nationalArticles} />

      {/* 9. Crime & Investigation (Dark Editorial) */}
      <CrimeSection articles={crimeArticles} />

      {/* 10. Live Daily Gold, Silver & Currency Rates Section */}
      <GoldAndForexSection />

      {/* 11. Business & Financial Markets (with Sensex, Nifty, Gold widgets) */}
      <BusinessSection articles={businessArticles} />

      {/* 11. Sports & Scoreboard */}
      <SportsSection articles={sportsArticles} />

      {/* 12. Entertainment & Cinema */}
      <EntertainmentSection articles={entertainmentArticles} />

      {/* 13. Technology & AI */}
      <TechnologySection articles={techArticles} />

      {/* 14. Explained Section (Question Based Journalism) */}
      <ExplainedSection articles={latestArticles.slice(3, 5)} />

      {/* 15. Multimedia: Dark Videos Strip, Shorts & Podcasts */}
      <MultimediaSection articles={latestArticles.slice(5, 14)} />

      {/* 16. Interactive Features: Cartoon of Day, Daily Quiz & Daily Puzzles */}
      <InteractiveFeaturesSection />

      {/* 17. Opinion Columnists & Numbered Most Read 01-05 */}
      <OpinionAndMostReadSection
        opinionArticles={latestArticles.slice(2, 6)}
        mostReadArticles={mostReadArticles}
      />

      {/* 18. WhatsApp Channel CTA */}
      <WhatsAppCTA />

      {/* 19. Morning Brief Newsletter */}
      <div id="newsletter-section">
        <NewsletterCTA />
      </div>

      {/* 20. Massive Global Editorial Footer */}
      <Footer />
    </div>
  );
}
