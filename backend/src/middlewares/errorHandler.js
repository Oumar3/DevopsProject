/**
 * Middleware de gestion des erreurs globales
 */

const errorHandler = (error, req, res, next) => {
  console.error('❌ Erreur:', error.stack);

  // Erreur de validation MongoDB
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors
    });
  }

  // Erreur de cast MongoDB (ID invalide)
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Ressource non trouvée'
    });
  }

  // Erreur MongoDB de duplication
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Ressource déjà existante'
    });
  }

  // Erreur par défaut
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur serveur interne'
  });
};

export default errorHandler;