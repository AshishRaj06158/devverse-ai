import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  🚀 DevVerse AI Backend Server Running   `);
  console.log(`  📡 Listening on port: ${PORT}           `);
  console.log(`  🌐 Local URL: http://localhost:${PORT}  `);
  console.log(`=========================================`);
});
