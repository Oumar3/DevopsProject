import { getArticles,createArticle} from '../controllers/articleController.js';
import { Router } from "express";

const router = Router();

// Route pour récupérer tous les articles
router.get('/', getArticles);

// Routes pour CRUD (décommentées)
router.post('/', createArticle);
// router.put('/:id', updateArticle);
// router.delete('/:id', deleteArticle);

export default router;