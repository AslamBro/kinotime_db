import express from 'express';
import { PrismaClient } from '@prisma/client';
import translatePkg from '@google-cloud/translate';

const { v2 } = translatePkg;
const translate = new v2.Translate({
  keyFilename: 'C:/Users/acer/Downloads/carbon-ray-452407-f8-161224a2daa9.json',
});

const router = express.Router();
const prisma = new PrismaClient();

const translatableFields = ['title', 'originalTitle', 'overview', 'status', 'director'];

async function translateTextAsync(text, targetLang) {
  if (!text) return text;
  try {
    console.log(`🔄 Translating "${text}" to [${targetLang}]`);
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (e) {
    console.error('❌ Translation API error:', e);
    return text;
  }
}

async function translateMovieAsync(movie, lang) {
  if (!movie) return movie;
  const translated = { ...movie };

  for (const field of translatableFields) {
    if (translated[field]) {
      translated[field] = await translateTextAsync(translated[field], lang);
    }
  }

  if (translated.genres?.length) {
    for (let i = 0; i < translated.genres.length; i++) {
      translated.genres[i].name = await translateTextAsync(translated.genres[i].name, lang);
    }
  }

  if (translated.actors?.length) {
    for (let i = 0; i < translated.actors.length; i++) {
      translated.actors[i].name = await translateTextAsync(translated.actors[i].name, lang);
    }
  }

  if (translated.productionCountries?.length) {
    for (let i = 0; i < translated.productionCountries.length; i++) {
      translated.productionCountries[i].name = await translateTextAsync(translated.productionCountries[i].name, lang);
    }
  }

  return translated;
}

// ✅ GET all movies
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en';
  try {
    const movies = await prisma.movie.findMany({
      include: { genres: true, actors: true },
    });

    const translated = await Promise.all(movies.map(m => translateMovieAsync(m, lang)));
    res.json(translated);
  } catch (error) {
    console.error('❌ Get Movies Error:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// ✅ GET movie by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const lang = req.query.lang || 'en';

  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: { genres: true, actors: true },
    });

    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const translated = await translateMovieAsync(movie, lang);
    res.json(translated);
  } catch (error) {
    console.error('❌ Get Movie By ID Error:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

// ✅ POST create movie
router.post('/', async (req, res) => {
  try {
    const {
      tmdbId,
      imdbRating,
      title,
      originalTitle,
      overview,
      releaseDate,
      runtime,
      status,
      poster,
      backdrop,
      voteAverage,
      voteCount,
      popularity,
      originalLanguage,
      budget,
      revenue,
      genres,
      actors,
      trailers,
      productionCompanies,
      productionCountries,
      spokenLanguages,
      images,
      director,
    } = req.body;

    const movie = await prisma.movie.create({
      data: {
        tmdbId,
        imdbRating,
        title,
        originalTitle,
        overview,
        releaseDate: releaseDate ? new Date(releaseDate) : undefined,
        runtime,
        status,
        poster,
        backdrop,
        voteAverage,
        voteCount,
        popularity,
        originalLanguage,
        budget,
        revenue,
        director,
        trailers,
        productionCompanies,
        productionCountries,
        spokenLanguages,
        images,
        genres: {
          connect: genres?.map(id => ({ id })),
        },
        actors: {
          connect: actors?.map(id => ({ id })),
        },
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error('❌ Create Movie Error:', error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// ✅ PUT update movie
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const {
      tmdbId,
      imdbRating,
      title,
      originalTitle,
      overview,
      releaseDate,
      runtime,
      status,
      poster,
      backdrop,
      voteAverage,
      voteCount,
      popularity,
      originalLanguage,
      budget,
      revenue,
      genres,
      actors,
      trailers,
      productionCompanies,
      productionCountries,
      spokenLanguages,
      images,
      director,
    } = req.body;

    const updated = await prisma.movie.update({
      where: { id },
      data: {
        tmdbId,
        imdbRating,
        title,
        originalTitle,
        overview,
        releaseDate: releaseDate ? new Date(releaseDate) : undefined,
        runtime,
        status,
        poster,
        backdrop,
        voteAverage,
        voteCount,
        popularity,
        originalLanguage,
        budget,
        revenue,
        director,
        trailers,
        productionCompanies,
        productionCountries,
        spokenLanguages,
        images,
        genres: {
          set: [],
          connect: genres?.map(id => ({ id })),
        },
        actors: {
          set: [],
          connect: actors?.map(id => ({ id })),
        },
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('❌ Update Movie Error:', error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

// ✅ DELETE movie
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.movie.delete({
      where: { id },
    });

    res.json({ message: 'Movie deleted successfully', deleted });
  } catch (error) {
    console.error('❌ Delete Movie Error:', error);
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

export default router;
