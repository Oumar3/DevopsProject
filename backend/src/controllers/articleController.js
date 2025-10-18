import Article from '../models/Article.js';

const getArticles = async (req, res) => {
  console.log("hello ");
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newArticle = new Article({ title, content, author });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { title, content, author } = req.body;
  const { id } = req.params;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.json({ message: "Article supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getArticles, createArticle, updateArticle, deleteArticle };