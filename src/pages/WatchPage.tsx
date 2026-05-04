import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  List,
} from "lucide-react";
import {
  LIBRARY_ANIME,
  AnimeEntry,
  saveContinueWatching,
  addToWatchHistory,
} from "../data/animeData";
import { useAnimeById } from "../hooks/useJikan";

// ─── Source definitions ──────────────────────────────────────
function getSources(imdbId: string, season: number, episode: number) {
  return [
    {
      label: "VidSrc",
      url: `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode}`,
    },
    {
      label: "VidSrc.cc",
      url: `https://vidsrc.cc/v2/embed/tv/${imdbId}/${season}/${episode}`,
    },
    {
      label: "VidSrc.me",
      url: `https://vidsrc.me/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}`,
    },
    {
      label: "2embed",
      url: `https://www.2embed.cc/embedtv/${imdbId}&s=${season}&e=${episode}`,
    },
  ];
}

// ─── Episode list component ───────────────────────────────────
interface EpisodeListProps {
  total: number;
  current: number;
  season: number;
  seasons: number;
  onSelect: (ep: number) => void;
  onSeasonChange: (s: number) => void;
}

function EpisodeList({ total, current, season, seasons, onSelect, onSeasonChange }: EpisodeListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-ep="${current}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [current]);

  return (
    <div className="bg-gray-900/80 rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <List className="w-4 h-4 text-red-400" /> Episodes
        </h3>
        <select
          value={season}
          onChange={(e) => onSeasonChange(Number(e.target.value))}
          className="bg-black/40 border border-white/10 text-white text-sm rounded-lg px-2 py-1 focus:outline-none focus:border-red-500"
        >
          {Array.from({ length: Math.max(seasons, 1) }, (_, i) => i + 1).map((s) => (
            <option key={s} value={s}>
              Season {s}
            </option>
          ))}
        </select>
      </div>
      <div ref={listRef} className="max-h-80 overflow-y-auto p-3 grid grid-cols-5 sm:grid-cols-6 gap-1.5">
        {Array.from({ length: total }, (_, i) => i + 1).map((ep) => (
          <button
            key={ep}
            data-ep={ep}
            onClick={() => onSelect(ep)}
            className={`h-10 rounded-lg text-sm font-medium transition-all ${
              ep === current
                ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                : "bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/5"
            }`}
          >
            {ep}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Watch Page ──────────────────────────────────────────
export default function WatchPage() {
  const { malId } = useParams<{ malId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = parseInt(malId || "0");
  const localAnime = LIBRARY_ANIME.find((a) => a.malId === id) as AnimeEntry | undefined;
  const { data: jikanAnime } = useAnimeById(localAnime ? null : id);

  // Episode / season state
  const initSeason = parseInt(searchParams.get("season") || "1");
  const initEp = parseInt(searchParams.get("episode") || "1");
  const [season, setSeason] = useState(initSeason);
  const [episode, setEpisode] = useState(initEp);
  const [sourceIdx, setSourceIdx] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [showEpList, setShowEpList] = useState(true);

  const title =
    localAnime?.englishTitle ||
    jikanAnime?.title_english ||
    jikanAnime?.title ||
    "Anime";

  const imdbId = localAnime?.imdbId || "";
  const totalEpisodes = localAnime?.episodes || jikanAnime?.episodes || 24;
  const totalSeasons = localAnime?.season || 1;
  const coverImage = localAnime?.coverImage || jikanAnime?.images?.jpg?.large_image_url || "";

  const sources = imdbId ? getSources(imdbId, season, episode) : [];
  const currentSource = sources[sourceIdx] || null;

  // Save watch progress every time ep/season changes
  useEffect(() => {
    if (!id) return;
    addToWatchHistory(id);
    saveContinueWatching({ malId: id, season, episode, timestamp: Date.now(), percent: 0 });
    // Update URL params
    setSearchParams({ season: String(season), episode: String(episode) }, { replace: true });
  }, [id, season, episode]);

  const reload = useCallback(() => setIframeKey((k) => k + 1), []);

  const prevEp = () => {
    if (episode > 1) setEpisode((e) => e - 1);
    else if (season > 1) { setSeason((s) => s - 1); setEpisode(1); }
    setIframeKey((k) => k + 1);
  };

  const nextEp = () => {
    if (episode < totalEpisodes) setEpisode((e) => e + 1);
    else if (season < totalSeasons) { setSeason((s) => s + 1); setEpisode(1); }
    setIframeKey((k) => k + 1);
  };

  const selectEp = (ep: number) => {
    setEpisode(ep);
    setIframeKey((k) => k + 1);
  };

  const selectSeason = (s: number) => {
    setSeason(s);
    setEpisode(1);
    setIframeKey((k) => k + 1);
  };

  if (!imdbId) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Stream Available</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            This anime is not yet mapped to an IMDb ID in our database. We use IMDb IDs to power
            VidSrc embeds. You can add it by contributing to the project!
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
            <button
              onClick={() => navigate("/library")}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors"
            >
              Browse Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        {/* Top bar */}
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="min-w-0">
            <span className="text-white font-semibold text-sm sm:text-base truncate">{title}</span>
            <span className="text-gray-500 text-sm ml-2">
              — Season {season}, Episode {episode}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left: Player + controls */}
          <div>
            {/* Player */}
            <div className="relative bg-black rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/60">
              <div className="aspect-video w-full">
                <iframe
                  key={iframeKey}
                  src={currentSource.url}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture"
                  referrerPolicy="no-referrer"
                  title={`${title} S${season}E${episode}`}
                />
              </div>

              {/* Loading overlay hint */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none h-16" />
            </div>

            {/* Player controls */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Prev/Next */}
              <div className="flex gap-2">
                <button
                  onClick={prevEp}
                  disabled={season === 1 && episode === 1}
                  className="flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={nextEp}
                  disabled={season >= totalSeasons && episode >= totalEpisodes}
                  className="flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Source switcher */}
              <div className="flex gap-1.5 flex-wrap">
                {sources.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSourceIdx(idx); setIframeKey((k) => k + 1); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      idx === sourceIdx
                        ? "bg-red-600 text-white"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {src.label}
                  </button>
                ))}
              </div>

              {/* Utility buttons */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={reload}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
                  title="Reload player"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={currentSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setShowEpList(!showEpList)}
                  className="lg:hidden flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <List className="w-3.5 h-3.5" />
                  Episodes
                </button>
              </div>
            </div>

            {/* Source info */}
            <div className="mt-3 p-3 bg-white/3 rounded-xl border border-white/5 text-xs text-gray-500">
              <span className="text-gray-400 font-medium">Streaming:</span>{" "}
              <span className="text-gray-600">{currentSource.url}</span>
            </div>

            {/* NSFW notice */}
            <div className="mt-3 flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-xs text-blue-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                Video is served by third-party embed providers. If one source doesn't load, try switching to another above.
                We do not host any video content.
              </p>
            </div>

            {/* Mobile episode list */}
            {showEpList && (
              <div className="lg:hidden mt-4">
                <EpisodeList
                  total={totalEpisodes}
                  current={episode}
                  season={season}
                  seasons={totalSeasons}
                  onSelect={selectEp}
                  onSeasonChange={selectSeason}
                />
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Anime info card */}
            <div className="bg-gray-900/80 rounded-2xl border border-white/10 p-4 flex gap-4">
              {coverImage && (
                <img
                  src={coverImage}
                  alt={title}
                  className="w-16 h-24 rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight mb-1">{title}</p>
                <p className="text-gray-500 text-xs">
                  S{season} · E{episode} of {totalEpisodes}
                </p>
                <p className="text-gray-600 text-xs mt-1">IMDb: {imdbId}</p>
                <button
                  onClick={() => navigate(`/anime/${id}`)}
                  className="mt-2 text-red-400 text-xs hover:text-red-300 transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>

            {/* Episode list (desktop) */}
            <div className="hidden lg:block">
              <EpisodeList
                total={totalEpisodes}
                current={episode}
                season={season}
                seasons={totalSeasons}
                onSelect={selectEp}
                onSeasonChange={selectSeason}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
