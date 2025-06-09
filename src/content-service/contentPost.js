import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/media', async (req, res) => {
  const { type, data } = req.body;

  if (!type || !['movie', 'tv'].includes(type)) {
    return res.status(400).json({ error: 'Invalid or missing type. Use "movie" or "tv".' });
  }

  try {
    // Genres qo'shish yoki topish
    const genres = await Promise.all(
      (data.genres || []).map(async (g) => {
        return await prisma.genre.upsert({
          where: { name: g.name },
          update: {},
          create: { name: g.name },
        });
      })
    );

    // Actors qo'shish yoki topish
    const actors = await Promise.all(
      (data.cast || []).map(async (a) => {
        return await prisma.actor.upsert({
          where: { name: a.name },
          update: { profile: a.profile_path ? `https://image.tmdb.org/t/p/w500${a.profile_path}` : null },
          create: {
            name: a.name,
            profile: a.profile_path ? `https://image.tmdb.org/t/p/w500${a.profile_path}` : null,
          },
        });
      })
    );

    // Common data (movie va serial uchun)
    const commonData = {
      tmdbId: data.id,
      title: data.title,
      imdbRating: data.tmdb_rating,
      originalTitle: data.original_title,
      overview: data.overview,
      status: data.status || null,
      poster: data.poster_url || (data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null),
      backdrop: data.backdrop_url || (data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null),
      voteAverage: data.vote_average || null,
      voteCount: data.vote_count || null,
      popularity: data.popularity || null,
      originalLanguage: data.original_language || null,
      trailers: data.trailer_url ? [data.trailer_url] : null,
      productionCompanies: data.production_companies || null,
      productionCountries: data.production_countries || null,
      spokenLanguages: data.spoken_languages || null,
      images: data.images || null,
      director: data.crew?.find(c => c.job === 'Director')?.name || null,
    };

    let createdContent;

    if (type === 'movie') {
      createdContent = await prisma.movie.create({
        data: {
          ...commonData,
          releaseDate: data.release_date ? new Date(data.release_date) : null,
          runtime: data.runtime || null,
          budget: data.budget || null,
          revenue: data.revenue || null,
          genres: {
            connect: genres.map(g => ({ id: g.id })),
          },
          actors: {
            connect: actors.map(a => ({ id: a.id })),
          },
        },
      });
    } else {
      // tv - serial
      createdContent = await prisma.serial.create({
        data: {
          ...commonData,
          firstAirDate: data.first_air_date ? new Date(data.first_air_date) : null,
          genres: {
            connect: genres.map(g => ({ id: g.id })),
          },
          actors: {
            connect: actors.map(a => ({ id: a.id })),
          },
        },
      });
    }

    res.json({ success: true, content: createdContent });
  } catch (error) {
    console.error('Failed to save media:', error);
    res.status(500).json({ error: 'Failed to save media.' });
  }
});

export default router;
