import mongoose from "mongoose";

/**
 * Schéma de l'article
 * -------------------
 * Ce schéma décrit la structure d'un article dans la base de données MongoDB.
 * Chaque document contient un titre, un contenu, un auteur et une date de création.
 */

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre de l'article est requis"],
      trim: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, "Le contenu de l'article est requis"],
    },
    author: {
      type: String,
      required: [true, "Le nom de l'auteur est requis"],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

/**
 * Modèle Article
 * --------------
 * Le modèle représente la collection "articles" dans MongoDB
 * et fournit une interface pour effectuer les opérations CRUD.
 */
const Article = mongoose.model("Article", articleSchema);

export default Article;
