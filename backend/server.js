import express from 'express';
import connectDB from './src/config/db.conf.js';
import articleRoutes from './src/routes/articleRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();

// Connexion à la base de données
connectDB();

// Configuration CORS - Seulement nécessaire pour le développement local
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000',"https://www.oumar.dev","https://oumar.dev"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));
    console.log('🔧 CORS activé pour le développement');
} else {
    console.log('🚀 Production: CORS désactivé (Nginx reverse proxy)');
}

// Middlewares
app.use(express.json());

// Routes
app.use('/api/articles', articleRoutes);

app.listen(5000, () => {console.log(`✅ Server running on http://localhost:5000`);});
