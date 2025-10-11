import express from 'express';
import articleRoutes from './src/routes/articleRoutes.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Route de test simple (sans DB)
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API fonctionne !', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Routes principales
app.use('/api', articleRoutes);

// Export de l'application
export default app;