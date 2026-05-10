import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'super_secret_key_change_in_production';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ROUTES ---

app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, email, password, phone, city, country, additionalInfo } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    db.run(
      `INSERT INTO users (id, firstName, lastName, email, password, phone, city, country, additionalInfo) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, firstName, lastName, email, hashedPassword, phone, city, country, additionalInfo],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists', code: 'auth/email-already-in-use' });
          }
          return res.status(500).json({ error: 'Database error: ' + err.message });
        }
        
        // Generate token
        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: { id: userId, firstName, lastName, email, phone, city, country, additionalInfo }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found', code: 'auth/user-not-found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password', code: 'auth/wrong-password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    // Don't send password hash back
    delete user.password;
    
    res.json({ token, user });
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    delete user.password;
    res.json({ user });
  });
});


// --- TRIP ROUTES ---

app.post('/api/trips', authenticateToken, upload.single('coverImage'), (req, res) => {
  const { title, destination, startDate, endDate, budget } = req.body;
  const userId = req.user.id;
  const tripId = crypto.randomUUID();
  
  // Create relative URL for frontend to use
  const coverImage = req.file ? `/uploads/${req.file.filename}` : '';

  db.run(
    `INSERT INTO trips (id, userId, title, destination, startDate, endDate, coverImage) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [tripId, userId, title, destination, startDate, endDate, coverImage],
    function (err) {
      if (err) return res.status(500).json({ error: 'Database error: ' + err.message });
      res.status(201).json({ id: tripId, message: 'Trip created successfully' });
    }
  );
});

app.get('/api/trips', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.all(`SELECT * FROM trips WHERE userId = ? ORDER BY createdAt DESC`, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.delete('/api/trips/:id', authenticateToken, (req, res) => {
  const tripId = req.params.id;
  const userId = req.user.id;

  // Optional: Delete the image file from /uploads if you want to be thorough

  db.run(`DELETE FROM trips WHERE id = ? AND userId = ?`, [tripId, userId], function (err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Trip not found or unauthorized' });
    res.json({ message: 'Trip deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
