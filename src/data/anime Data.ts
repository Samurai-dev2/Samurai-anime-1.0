// ============================================================
// SAMURAI ANIME - Anime Data & ID Mappings
// ============================================================
// API KEYS: Place your TMDB API key in src/config.ts
// Jikan (MAL) is free and requires no API key
// ============================================================

export interface AnimeEntry {
  malId: number;
  tmdbId: number;
  imdbId: string;
  title: string;
  englishTitle: string;
  description: string;
  genre: string[];
  year: number;
  rating: number;
  episodes: number | null;
  status: "Finished" | "Airing" | "Upcoming";
  coverImage: string;
  bannerImage: string;
  season?: number; // TMDB season number for this MAL entry
  studio: string;
  trailer?: string;
  type: "TV" | "Movie" | "OVA";
  tags: string[];
}

// ─── Featured / Hero Anime ───────────────────────────────────
export const FEATURED_ANIME: AnimeEntry[] = [
  {
    malId: 813,
    tmdbId: 12971,
    imdbId: "tt0214341",
    title: "Dragon Ball Z",
    englishTitle: "Dragon Ball Z",
    description:
      "Five years after winning the World Martial Arts tournament, Goku is now living a peaceful life with his wife and son. This changes, however, with the arrival of a mysterious enemy named Raditz who presents himself as Goku's long-lost brother. He reveals that Goku is a warrior from the once-powerful but now virtually extinct Saiyan race, whose homeworld was obliterated. Goku must now fight incredible opponents and unlock the legendary power of the Super Saiyan.",
    genre: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
    year: 1989,
    rating: 8.8,
    episodes: 291,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/1277/142022.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/76666/backgrounds/655a6b5dd88f3.jpg",
    season: 1,
    studio: "Toei Animation",
    type: "TV",
    tags: ["Saiyan", "Power Levels", "Classic", "Shonen"],
  },
  {
    malId: 1535,
    tmdbId: 13916,
    imdbId: "tt0877057",
    title: "Death Note",
    englishTitle: "Death Note",
    description:
      "A high school student named Light Yagami discovers a supernatural notebook — the Death Note — that grants its user the power to kill anyone whose name and face he knows. After confirming its powers, Light decides to use the notebook to rid the world of criminals under the alias 'Kira'. As the brutal killings attract worldwide attention, a mysterious detective known as 'L' challenges Light — who refuses to be caught.",
    genre: ["Mystery", "Psychological", "Supernatural", "Thriller"],
    year: 2006,
    rating: 9.0,
    episodes: 37,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/79481/backgrounds/6268e9eeb1ea1.jpg",
    season: 1,
    studio: "Madhouse",
    type: "TV",
    tags: ["Cat and Mouse", "Psychological", "Dark", "Genius"],
  },
  {
    malId: 21,
    tmdbId: 37854,
    imdbId: "tt0388629",
    title: "One Piece",
    englishTitle: "One Piece",
    description:
      "Gold Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, the One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding the One Piece — which promises an unlimited amount of riches and fame — and the title of the Pirate King.",
    genre: ["Action", "Adventure", "Comedy", "Fantasy"],
    year: 1999,
    rating: 9.1,
    episodes: null,
    status: "Airing",
    coverImage: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/81797/backgrounds/627f03ab07e14.jpg",
    season: 1,
    studio: "Toei Animation",
    type: "TV",
    tags: ["Pirates", "Adventure", "Grand Line", "Shonen"],
  },
  {
    malId: 14719,
    tmdbId: 46195,
    imdbId: "tt2359704",
    title: "JoJo's Bizarre Adventure",
    englishTitle: "JoJo's Bizarre Adventure",
    description:
      "In 1868, Dario Brando saves the life of an English nobleman, George Joestar. By taking in Dario's son Dio when the boy becomes fatherless, George hopes to repay his debt. But Dio, unsatisfied with his station in life, plans to usurp the Joestar house using an ancient stone mask. What follows is a generations-spanning tale of the heroic Joestar family and their never-ending battle against the supernatural forces of evil.",
    genre: ["Action", "Adventure", "Supernatural"],
    year: 2012,
    rating: 8.9,
    episodes: 26,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/263023/backgrounds/62b9b7745568f.jpg",
    season: 1,
    studio: "David Production",
    type: "TV",
    tags: ["Stands", "Bizarre", "Iconic", "Shonen"],
  },
];

// ─── Library Anime (no NSFW / adult content) ─────────────────
export const LIBRARY_ANIME: AnimeEntry[] = [
  ...FEATURED_ANIME,
  {
    malId: 16498,
    tmdbId: 46562,
    imdbId: "tt2560140",
    title: "Shingeki no Kyojin",
    englishTitle: "Attack on Titan",
    description:
      "Humanity lives within enormous walled cities to protect themselves from the Titans, gigantic humanoid beings who devour humans seemingly without reason. After the walls are breached and his mother is killed, Eren Yeager swears revenge and joins the Survey Corps.",
    genre: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    year: 2013,
    rating: 9.0,
    episodes: 25,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/267440/backgrounds/626d89a32d43b.jpg",
    season: 1,
    studio: "Wit Studio",
    type: "TV",
    tags: ["Titans", "Dark", "Military", "Survival"],
  },
  {
    malId: 5114,
    tmdbId: 31911,
    imdbId: "tt1355642",
    title: "Fullmetal Alchemist: Brotherhood",
    englishTitle: "Fullmetal Alchemist: Brotherhood",
    description:
      "Edward and Alphonse Elric paid the ultimate price when they tried to use alchemy to resurrect their deceased mother. Now Edward, a State Alchemist, seeks the Philosopher's Stone to restore his brother's body and his own limbs.",
    genre: ["Action", "Adventure", "Fantasy"],
    year: 2009,
    rating: 9.1,
    episodes: 64,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/83322/backgrounds/5e5c4cd0bb7b9.jpg",
    season: 1,
    studio: "Bones",
    type: "TV",
    tags: ["Alchemy", "Brotherhood", "Dark", "Shonen"],
  },
  {
    malId: 20,
    tmdbId: 46260,
    imdbId: "tt0988824",
    title: "Naruto",
    englishTitle: "Naruto",
    description:
      "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
    genre: ["Action", "Adventure", "Fantasy"],
    year: 2002,
    rating: 8.3,
    episodes: 220,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/78857/backgrounds/5e5c3c3a7e42c.jpg",
    season: 1,
    studio: "Studio Pierrot",
    type: "TV",
    tags: ["Ninja", "Friendship", "Classic", "Shonen"],
  },
  {
    malId: 269,
    tmdbId: 30983,
    imdbId: "tt0367866",
    title: "Bleach",
    englishTitle: "Bleach",
    description:
      "Ichigo Kurosaki is a teenager with the ability to see ghosts. After an accidental encounter with Rukia Kuchiki, a Soul Reaper, Ichigo becomes a substitute Soul Reaper and must protect humans from evil spirits.",
    genre: ["Action", "Adventure", "Supernatural"],
    year: 2004,
    rating: 8.2,
    episodes: 366,
    status: "Airing",
    coverImage: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    bannerImage: "https://artworks.thetvdb.com/banners/v4/series/74796/backgrounds/5e5c4e7a62459.jpg",
    season: 1,
    studio: "Studio Pierrot",
    type: "TV",
    tags: ["Soul Reaper", "Zanpakuto", "Classic", "Shonen"],
  },
  {
    malId: 11757,
    tmdbId: 45782,
    imdbId: "tt2368135",
    title: "Sword Art Online",
    englishTitle: "Sword Art Online",
    description:
      "In 2022, virtual reality has progressed by leaps and bounds, and a massive online role-playing game called Sword Art Online (SAO) is launched. With the aid of a special helmet called NerveGear, players can control their avatars within the game using nothing but their own thoughts. However, the game's players are unable to log out.",
    genre: ["Action", "Adventure", "Fantasy", "Romance"],
    year: 2012,
    rating: 7.2,
    episodes: 25,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
    bannerImage: "",
    season: 1,
    studio: "A-1 Pictures",
    type: "TV",
    tags: ["Virtual Reality", "MMORPG", "Isekai", "Action"],
  },
  {
    malId: 31964,
    tmdbId: 65930,
    imdbId: "tt5646326",
    title: "Boku no Hero Academia",
    englishTitle: "My Hero Academia",
    description:
      "In a world where most people have superpowers — known as Quirks — Izuku Midoriya dreams of becoming a hero despite being born without a Quirk. After a chance encounter with the greatest hero, All Might, Izuku is given the chance to reach for his dream.",
    genre: ["Action", "Comedy", "School", "Superhero"],
    year: 2016,
    rating: 8.0,
    episodes: 88,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    bannerImage: "",
    season: 1,
    studio: "Bones",
    type: "TV",
    tags: ["Quirks", "Heroes", "School", "Shonen"],
  },
  {
    malId: 38000,
    tmdbId: 85937,
    imdbId: "tt9335498",
    title: "Kimetsu no Yaiba",
    englishTitle: "Demon Slayer",
    description:
      "After his family is slaughtered by a demon, Tanjiro Kamado sets out to become a demon slayer to avenge his family and find a cure for his sister Nezuko, who has been turned into a demon.",
    genre: ["Action", "Dark Fantasy", "Historical"],
    year: 2019,
    rating: 8.7,
    episodes: 26,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    bannerImage: "",
    season: 1,
    studio: "ufotable",
    type: "TV",
    tags: ["Demons", "Swords", "Family", "Shonen"],
  },
  {
    malId: 41467,
    tmdbId: 95479,
    imdbId: "tt14314368",
    title: "Jujutsu Kaisen",
    englishTitle: "Jujutsu Kaisen",
    description:
      "A boy swallows a cursed talisman — the finger of a Demon — and becomes one with the demon Ryomen Sukuna. He is now the vessel of a dangerous demon, and must attend Tokyo Jujutsu High to learn to control his power.",
    genre: ["Action", "Dark Fantasy", "Supernatural"],
    year: 2020,
    rating: 8.6,
    episodes: 24,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    bannerImage: "",
    season: 1,
    studio: "MAPPA",
    type: "TV",
    tags: ["Cursed Energy", "Sorcerers", "Dark", "Shonen"],
  },
  {
    malId: 1,
    tmdbId: 30984,
    imdbId: "tt0168366",
    title: "Cowboy Bebop",
    englishTitle: "Cowboy Bebop",
    description:
      "In 2071, bounty hunters Spike Spiegel and Jet Black travel through space on their ship, the Bebop, chasing bounties and confronting their respective pasts. They are later joined by Faye Valentine, Ed, and Ein the dog.",
    genre: ["Action", "Adventure", "Comedy", "Sci-Fi"],
    year: 1998,
    rating: 9.0,
    episodes: 26,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
    bannerImage: "",
    season: 1,
    studio: "Sunrise",
    type: "TV",
    tags: ["Space", "Bounty Hunters", "Jazz", "Classic"],
  },
  {
    malId: 23755,
    tmdbId: 61374,
    imdbId: "tt3707082",
    title: "Hunter x Hunter (2011)",
    englishTitle: "Hunter x Hunter",
    description:
      "Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, Gon might have what it takes — but to become a Hunter, he must pass the rigorous Hunter Examination.",
    genre: ["Action", "Adventure", "Fantasy"],
    year: 2011,
    rating: 9.1,
    episodes: 148,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
    bannerImage: "",
    season: 1,
    studio: "Madhouse",
    type: "TV",
    tags: ["Nen", "Adventure", "Friendship", "Shonen"],
  },
  {
    malId: 2904,
    tmdbId: 30875,
    imdbId: "tt0291877",
    title: "Code Geass",
    englishTitle: "Code Geass: Lelouch of the Rebellion",
    description:
      "After the Holy Empire of Britannia conquers Japan, an exiled prince named Lelouch Lamperouge obtains a mysterious power and uses it to lead a rebellion against the empire.",
    genre: ["Action", "Military", "Mecha", "Sci-Fi"],
    year: 2006,
    rating: 8.7,
    episodes: 25,
    status: "Finished",
    coverImage: "https://cdn.myanimelist.net/images/anime/5/50331.jpg",
    bannerImage: "",
    season: 1,
    studio: "Sunrise",
    type: "TV",
    tags: ["Geass", "Rebellion", "Mecha", "Psychological"],
  },
];

// ─── Genre List ───────────────────────────────────────────────
export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Dark Fantasy",
  "Fantasy",
  "Historical",
  "Mecha",
  "Military",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "School",
  "Supernatural",
  "Thriller",
];

// ─── VidSrc URL Builder ───────────────────────────────────────
export function buildVidSrcUrl(
  imdbId: string,
  season?: number,
  episode?: number
): string {
  if (season && episode) {
    return `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode}`;
  }
  return `https://vidsrc.to/embed/tv/${imdbId}/1/1`;
}

// Alternative embed sources (fallback)
export function buildAltVidSrcUrl(
  imdbId: string,
  season?: number,
  episode?: number
): string {
  if (season && episode) {
    return `https://vidsrc.cc/v2/embed/tv/${imdbId}/${season}/${episode}`;
  }
  return `https://vidsrc.cc/v2/embed/tv/${imdbId}/1/1`;
}

// ─── localStorage helpers ─────────────────────────────────────
const CONTINUE_WATCHING_KEY = "samurai_continue_watching";
const WATCH_HISTORY_KEY = "samurai_watch_history";

export interface WatchProgress {
  malId: number;
  season: number;
  episode: number;
  timestamp: number; // unix ms
  percent: number;   // 0-100
}

export function getContinueWatching(): WatchProgress[] {
  try {
    return JSON.parse(localStorage.getItem(CONTINUE_WATCHING_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveContinueWatching(progress: WatchProgress) {
  const list = getContinueWatching().filter((p) => p.malId !== progress.malId);
  list.unshift(progress);
  localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(list.slice(0, 20)));
}

export interface WatchHistoryEntry {
  malId: number;
  timestamp: number;
}

export function getWatchHistory(): WatchHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToWatchHistory(malId: number) {
  const list = getWatchHistory().filter((h) => h.malId !== malId);
  list.unshift({ malId, timestamp: Date.now() });
  localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(list.slice(0, 50)));
}

export function getRecommendations(watchedMalIds: number[]): AnimeEntry[] {
  if (watchedMalIds.length === 0) {
    return LIBRARY_ANIME.filter(
      (a) => !FEATURED_ANIME.map((f) => f.malId).includes(a.malId)
    ).slice(0, 6);
  }
  const watchedGenres = new Set<string>();
  watchedMalIds.forEach((id) => {
    const anime = LIBRARY_ANIME.find((a) => a.malId === id);
    anime?.genre.forEach((g) => watchedGenres.add(g));
  });

  return LIBRARY_ANIME.filter((a) => !watchedMalIds.includes(a.malId))
    .map((a) => ({
      anime: a,
      score: a.genre.filter((g) => watchedGenres.has(g)).length,
    }))
    .sort((a, b) => b.score - a.score || b.anime.rating - a.anime.rating)
    .slice(0, 8)
    .map((x) => x.anime);
}
