import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Also serve public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`SRK Homes server listening on port ${port}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE' && port !== 3001) {
    console.warn(`Port ${port} in use, falling back to port 3001`);
    app.listen(3001, '0.0.0.0', () => {
      console.log(`SRK Homes server listening on port 3001`);
    });
  } else {
    console.error('Server error:', err);
  }
});
