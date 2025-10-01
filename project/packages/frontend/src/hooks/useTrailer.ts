import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useTrailer(mediaType: "movie" | "tv", id: number) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/?api_key=${API_KEY}`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube" && v.key
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (err) {
        console.error("Error fetching trailer", err);
        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [mediaType, id]);

  return { trailerKey, loading };
}
