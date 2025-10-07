/**
 * Utilitaires pour les réponses API
 */

class ApiResponse {
  /**
   * Réponse de succès
   */
  static success(res, data, message = 'Succès', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Réponse d'erreur
   */
  static error(res, message = 'Erreur', statusCode = 500, errors = null) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Réponse de validation
   */
  static validationError(res, errors) {
    return this.error(res, 'Erreur de validation', 400, errors);
  }

  /**
   * Réponse non trouvé
   */
  static notFound(res, message = 'Ressource non trouvée') {
    return this.error(res, message, 404);
  }

  /**
   * Réponse non autorisé
   */
  static unauthorized(res, message = 'Non autorisé') {
    return this.error(res, message, 401);
  }
}

export default ApiResponse;