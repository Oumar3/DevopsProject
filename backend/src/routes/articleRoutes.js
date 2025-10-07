import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { Router } from "express";

const router = Router();

// Exemple de route pour les articles
router.get('/articles', getArticles);
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;