import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, Star, Calendar, Tv, Users, ArrowLeft, BookmarkPlus, Check } from "lucide-react";
import { useAnimeById } from "../hooks/useJikan";
import { LIBRARY_ANIME, AnimeEntry } from "../data/animeData.ts";

export default function AnimeDetailPage() {
  const { malId } = useParams<{ malId: string }>();
  const navigate = useNavigate();
  const id = parseInt(malId || "0");

  const localAnime = LIBRARY_ANIME.find((a) => a.malId === id);
  const { data: jikanAnime, loading } = useAnimeById(id || null);

  const [watchlisted, setWatchlisted] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEp, setSelectedEp] = useState(1);

  // Check watchlist on mount
  useEffect(() => {
    const wl: number[] = JSON.parse(localStorage.getItem("samurai_watchlist") || "[]");
    setWatchlisted(wl.includes(id));
  }, [id]);

  const toggleWatchlist = () => {
    const wl: number[] = JSON.parse(localStorage.getItem("samurai_watchlist") || "[]");
    const newWl = wl.includes(id) ? wl.filter((i) => i !== id) : [...wl, id];
    localStorage.setItem("samurai_watchlist", JSON.stringify(newWl));
    setWatchlisted(!watchlisted);
  };

  if (loading && !localAnime) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Merge data: prefer jikan for fresh data, fall back to local
  const title =
    jikanAnime?.title_english || jikanAnime?.title || localAnime?.englishTitle || "Unknown";
  const description =
    jikanAnime?.synopsis || localAnime?.description || "";
  const cover =
    jikanAnime?.images?.jpg?.large_image_url || localAnime?.coverImage || "";
  const rating = jikanAnime?.score || localAnime?.rating || 0;
  const year = jikanAnime?.year || localAnime?.year || 0;
  const episodes = jikanAnime?.episodes || localAnime?.episodes;
  const status = jikanAnime?.status || localAnime?.status || "";
  const studio =
    jikanAnime?.studios?.[0]?.name || localAnime?.studio || "Unknown";
  const genres =
    jikanAnime?.genres?.map((g) => g.name) || localAnime?.genre || [];
  const imdbId = (localAnime as AnimeEntry | undefined)?.imdbId || "";

  const totalEpisodes = episodes || 24;
  const seasons = localAnime?.season || 1;

  const handleWatch = () => {
    navigate(`/watch/${id}?season=${selectedSeason}&episode=${selectedEp}`);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Banner */}
      <div className="relative h-64 sm:h-96">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top opacity-30 blur-sm"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 sm:left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-32 sm:-mt-48 relative z-10">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-48 h-72 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10">
              {cover ? (
                <img src={cover} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm px-4 text-center">
                  {title}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 sm:pt-16 text-center sm:text-left">
            <h1
              className="text-3xl sm:text-5xl font-black text-white mb-2 leading-tight"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start mb-4 text-sm">
              {rating > 0 && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-white">{rating.toFixed(1)}</span>
                </div>
              )}
              <span className="text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {year}
              </span>
              <span className="text-gray-500 flex items-center gap-1">
                <Tv className="w-4 h-4" /> {episodes ? `${episodes} eps` : "Ongoing"}
              </span>
              <span className="text-gray-500 flex items-center gap-1">
                <Users className="w-4 h-4" /> {studio}
              </span>
              <span
                className={`font-medium text-xs px-2 py-0.5 rounded-full ${
                  status.includes("Airing") || status === "Airing"
                    ? "bg-green-500/20 text-green-400"
                    : status === "Finished Airing" || status === "Finished"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
              {genres.slice(0, 6).map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 text-xs bg-white/5 border border-white/10 text-gray-300 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl">
              {description}
            </p>

            {/* Episode picker */}
            {imdbId && (
              <div className="mb-5 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Season</label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
                  >
                    {Array.from({ length: Math.max(seasons, 1) }, (_, i) => i + 1).map((s) => (
                      <option key={s} value={s}>
                        S{s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Episode</label>
                  <select
                    value={selectedEp}
                    onChange={(e) => setSelectedEp(Number(e.target.value))}
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
                  >
                    {Array.from({ length: Math.min(totalEpisodes, 999) }, (_, i) => i + 1).map(
                      (ep) => (
                        <option key={ep} value={ep}>
                          E{ep}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {imdbId ? (
                <button
                  onClick={handleWatch}
                  className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/40 hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/watch/${id}`)}
                  className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/40 hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch (Search)
                </button>
              )}
              <button
                onClick={toggleWatchlist}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all border ${
                  watchlisted
                    ? "bg-red-600/20 border-red-500 text-red-400"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                {watchlisted ? <Check className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
                {watchlisted ? "Watchlisted" : "Watchlist"}
              </button>
            </div>
          </div>
        </div>

        {/* No IMDb ID notice for Jikan-only results */}
        {!imdbId && jikanAnime && (
          <div className="mt-10 p-5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-sm">
            <strong>Note:</strong> This anime was found via Jikan/MAL but doesn't have a mapped IMDb ID in our local database yet.
            The player will attempt to find it automatically. For guaranteed playback, check our{" "}
            <button
              className="underline hover:text-yellow-300"
              onClick={() => navigate("/library")}
            >
              curated Library
            </button>
            .
          </div>
        )}
      </div>
    </div>
  );
}
