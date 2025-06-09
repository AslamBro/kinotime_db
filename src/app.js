import express from 'express';
import cors from 'cors';
import tmdbRoutes from './tmdb-service/tmdbAllService.js';
import mediaRoutes from './content-service/contentPost.js';
import movieRoutes from './movie-service/movieCrud.js'; // ✅ movie routes

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', tmdbRoutes);
app.use('/api', mediaRoutes);
app.use('/api/movies', movieRoutes); // ✅ movie CRUD routes

export default app;
