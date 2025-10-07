/**
 * Service pour la gestion des articles
 * Logique métier centralisée
 */

import Article from '../models/Article.js';

class ArticleService {
  /**
   * Récupère tous les articles
   */
  async getAllArticles(filters = {}) {
    try {
      const articles = await Article.find(filters).sort({ createdAt: -1 });
      return articles;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des articles: ${error.message}`);
    }
  }

  /**
   * Récupère un article par ID
   */
  async getArticleById(id) {
    try {
      const article = await Article.findById(id);
      if (!article) {
        throw new Error('Article non trouvé');
      }
      return article;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'article: ${error.message}`);
    }
  }

  /**
   * Crée un nouvel article
   */
  async createArticle(articleData) {
    try {
      const article = new Article(articleData);
      await article.save();
      return article;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'article: ${error.message}`);
    }
  }

  /**
   * Met à jour un article
   */
  async updateArticle(id, updateData) {
    try {
      const article = await Article.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!article) {
        throw new Error('Article non trouvé');
      }
      return article;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'article: ${error.message}`);
    }
  }

  /**
   * Supprime un article
   */
  async deleteArticle(id) {
    try {
      const article = await Article.findByIdAndDelete(id);
      if (!article) {
        throw new Error('Article non trouvé');
      }
      return article;
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'article: ${error.message}`);
    }
  }
}

export default new ArticleService();