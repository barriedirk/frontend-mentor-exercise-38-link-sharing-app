require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Create a user (simplified, no password hashing here yet)
app.post('/api/users', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.create({
      data: { email, name, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
});

// Get all links
app.get('/api/links', async (req, res) => {
  const links = await prisma.link.findMany({
    include: { user: { select: { id: true, email: true, name: true } } },
  });
  res.json(links);
});

// Create a link
app.post('/api/links', async (req, res) => {
  try {
    const { url, title, description, userId } = req.body;
    const link = await prisma.link.create({
      data: { url, title, description, userId },
    });
    res.json(link);
  } catch (error) {
    res.status(400).json({ error: 'Link creation failed' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
