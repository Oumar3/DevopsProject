import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { Router } from "express";

const router = Router();

// Route de test avec données statiques
router.get('/articles/test', (req, res) => {
  res.json([
    { id: 1, title: 'Article Test 1', content: 'Contenu test', author: 'Test Author' },
    { id: 2, title: 'Article Test 2', content: 'Contenu test 2', author: 'Test Author 2' }
  ]);
});

// Exemple de route pour les articles
router.get('/articles', getArticles);
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;