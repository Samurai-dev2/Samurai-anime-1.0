import { useMemo } from "react";
import HeroSlider from "../components/HeroSlider";
import AnimeRow from "../components/AnimeRow";
import NewReleaseBanner from "../components/NewReleaseBanner";
import { FEATURED_ANIME, LIBRARY_ANIME, getContinueWatching, getRecommendations, getWatchHistory } from "../data/animeData";
import { useTopAnime, useSeasonalAnime } from "../hooks/useJikan";

export default function HomePage() {
  const { data: topAnime, loading: topLoading } = useTopAnime(20);
  const { data: seasonal, loading: seasonalLoading } = useSeasonalAnime();

  const continueWatching = getContinueWatching();
  const watchHistory = getWatchHistory();
  const watchedIds = watchHistory.map((h) => h.malId);
  const recommendations = useMemo(() => getRecommendations(watchedIds), []);

  // Map progress by malId
  const progressMap = useMemo(() => {
    const map: Record<number, (typeof continueWatching)[0]> = {};
    continueWatching.forEach((p) => { map[p.malId] = p; });
    return map;
  }, [continueWatching]);

  // Anime with progress (from library)
  const continueItems = continueWatching
    .map((p) => LIBRARY_ANIME.find((a) => a.malId === p.malId))
    .filter(Boolean) as typeof LIBRARY_ANIME;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <HeroSlider />

      {/* Content sections */}
      <div className="space-y-10 py-8 -mt-2">
        {/* Continue Watching */}
        {continueItems.length > 0 && (
          <AnimeRow
            title="Continue Watching"
            subtitle="Pick up where you left off"
            items={continueItems}
            progressMap={progressMap}
          />
        )}

        {/* New Season Banner */}
        <NewReleaseBanner />

        {/* Featured */}
        <AnimeRow
          title="Featured Picks"
          subtitle="Hand-picked classics and essentials"
          items={FEATURED_ANIME}
        />

        {/* New Releases / Seasonal */}
        <AnimeRow
          title="New Releases"
          subtitle="Airing this season — fresh episodes every week"
          items={seasonal}
          isJikan
          loading={seasonalLoading}
        />

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <AnimeRow
            title="Recommended For You"
            subtitle="Based on your watch history"
            items={recommendations}
          />
        )}

        {/* Top Anime from Jikan */}
        <AnimeRow
          title="Top Anime"
          subtitle="Most popular on MyAnimeList"
          items={topAnime}
          isJikan
          loading={topLoading}
          size="md"
        />

        {/* Samurai Library preview */}
        <AnimeRow
          title="Samurai Library"
          subtitle="Browse our full collection"
          items={LIBRARY_ANIME}
          size="md"
        />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 text-sm">
            © 2025 Samurai Anime. For educational purposes only.
          </div>
          <div className="text-gray-700 text-xs text-center">
            Powered by{" "}
            <a href="https://jikan.moe" className="text-gray-500 hover:text-gray-400" target="_blank" rel="noreferrer">Jikan API</a>
            {" "}·{" "}
            <a href="https://vidsrc.to" className="text-gray-500 hover:text-gray-400" target="_blank" rel="noreferrer">VidSrc</a>
            {" "}·{" "}
            <a href="https://www.themoviedb.org" className="text-gray-500 hover:text-gray-400" target="_blank" rel="noreferrer">TMDB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
