import express from 'express';
import articleRoutes from './routes/articleRoutes.js';

const app = express();

// Middlewares
app.use(express.json());

// Routes principales
app.use('/api', articleRoutes);

// Export de l’application
export default app;