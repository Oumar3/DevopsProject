import dotenv from 'dotenv';
import connectDB from './src/config/db.conf.js';
import app from './index.js';
dotenv.config();


// Connexion à MongoDB puis démarrage du serveur
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Échec de la connexion à MongoDB :', error.message);
    process.exit(1); // Quitte le processus proprement
  }
};

startServer();
