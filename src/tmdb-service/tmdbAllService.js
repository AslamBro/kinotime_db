import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Universal search for movies, tv shows, and people
 */
async function searchAllContentByName(query) {
  const url = `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;

  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.statusText}`);
  }

  return await res.json();
}

// Route: /api/search-imdb/:query
router.get('/search-imdb/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const results = await searchAllContentByName(query);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message || 'Something went wrong.' });
  }
});

router.get('/media/:id', async (req, res) => {
  const { id } = req.params;
  const { type = 'movie' } = req.query;

  const allowedTypes = ['movie', 'tv'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Use movie or tv.' });
  }

  try {
    const url = `${TMDB_BASE_URL}/${type}/${id}?language=en-US&append_to_response=credits,videos,images,external_ids`;

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    const data = await response.json();

    const cast = (data.credits?.cast || []).slice(0, 10).map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path,
    }));

    const crew = (data.credits?.crew || []).filter(
      person => person.job === 'Director' || person.job === 'Producer'
    ).map(person => ({
      id: person.id,
      name: person.name,
      job: person.job,
      profile_path: person.profile_path,
    }));

    // Cheklov olib tashlandi — hamma backdrops kadrlari olinadi
    const images = (data.images?.backdrops || []).map(img => ({
      file_path: img.file_path,
      full_url: `https://image.tmdb.org/t/p/original${img.file_path}`,
      width: img.width,
      height: img.height,
    }));

    const trailer = (data.videos?.results || []).find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );

    const trailer_url = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    res.json({
      id: data.id,
      title: data.title || data.name,
      original_title: data.original_title || data.original_name,
      release_year: (data.release_date || data.first_air_date || '').split('-')[0],
      overview: data.overview,
      original_language: data.original_language,
      production_countries: data.production_countries || [],
      genres: data.genres || [],
      runtime: data.runtime || (Array.isArray(data.episode_run_time) ? data.episode_run_time[0] : null),
      adult: data.adult,
      poster_path: data.poster_path,
      poster_url: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
      backdrop_path: data.backdrop_path,
      backdrop_url: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null,
      cast,
      crew,
      images,  // barcha kadrlar shu yerda
      trailer_url,
      tmdb_rating: data.vote_average || null,
      tmdb_vote_count: data.vote_count || null,
      imdb_id: data.external_ids?.imdb_id || null
    });

  } catch (error) {
    console.error('Fetch media error:', error);
    res.status(500).json({ error: 'Failed to fetch media details.' });
  }
});

export default router;
