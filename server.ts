import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('portfolio.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL
  )
`);

// Seed initial data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO projects (title, category, image, description) VALUES (?, ?, ?, ?)');
  const initialProjects = [
    ['Lumina Brand Identity', 'Branding', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', 'A modern identity for a sustainable energy startup.'],
    ['Eco-Friendly App', 'UI/UX', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800', 'Mobile application design for environmental tracking.'],
    ['Cyberpunk Series', 'Illustration', 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800', 'A series of digital illustrations for a gaming magazine.'],
    ['Minimalist Poster', 'Graphic Design', 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800', 'Event poster design for an art exhibition.'],
    ['Vault Crypto Wallet', 'UI/UX', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 'Secure and sleek interface for digital assets.'],
    ['Organic Tea Co.', 'Branding', 'https://images.unsplash.com/photo-1544787210-2827443cb69b?auto=format&fit=crop&q=80&w=800', 'Packaging and brand design for premium tea.']
  ];
  initialProjects.forEach(p => insert.run(...p));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Auth Middleware
  const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'admin123';

  const isAdmin = (req: express.Request) => {
    const token = req.cookies.admin_token;
    const adminPass = getAdminPassword();
    const authorized = token && token === adminPass;
    if (!authorized) {
      console.log(`Auth failed. Token: ${token ? 'present' : 'missing'}, Match: ${token === adminPass}`);
    }
    return authorized;
  };

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.url.startsWith('/api/')) {
      console.log('Cookies:', JSON.stringify(req.cookies));
    }
    next();
  });

  // API Routes
  app.post('/api/login', (req, res) => {
    const { password } = req.body;
    console.log('Login attempt');
    if (password && password === getAdminPassword()) {
      res.cookie('admin_token', password, { 
        httpOnly: true, 
        sameSite: 'none', 
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  });

  app.post('/api/logout', (req, res) => {
    res.clearCookie('admin_token', { sameSite: 'none', secure: true });
    res.json({ success: true });
  });

  app.get('/api/check-auth', (req, res) => {
    const authenticated = isAdmin(req);
    console.log('Auth check:', authenticated);
    res.json({ isAdmin: authenticated });
  });

  app.get('/api/projects', (req, res) => {
    const projects = db.prepare('SELECT * FROM projects ORDER BY id DESC').all();
    res.json(projects);
  });

  app.post('/api/projects', (req, res) => {
    console.log('Create project attempt');
    if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' });
    const { title, category, image, description } = req.body;
    const result = db.prepare('INSERT INTO projects (title, category, image, description) VALUES (?, ?, ?, ?)').run(title, category, image, description);
    res.json({ id: result.lastInsertRowid });
  });

  app.put('/api/projects/:id', (req, res) => {
    console.log('Update project attempt:', req.params.id);
    if (!isAdmin(req)) return res.status(403).json({ error: 'Unauthorized' });
    const { title, category, image, description } = req.body;
    db.prepare('UPDATE projects SET title = ?, category = ?, image = ?, description = ? WHERE id = ?').run(title, category, image, description, req.params.id);
    res.json({ success: true });
  });

  app.delete('/api/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('Delete project attempt:', id);
    
    if (!isAdmin(req)) {
      console.log('Delete failed: Unauthorized');
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    try {
      const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);
      console.log('Delete result:', result.changes);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ success: true, changes: result.changes });
    } catch (err) {
      console.error('Database delete error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
