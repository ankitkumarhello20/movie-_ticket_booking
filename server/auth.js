const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'change_this_secret';

function generateToken(user) {
  const payload = { user_id: user.user_id, email: user.email, name: user.name };
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing authorization' });
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization' });
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { generateToken, verifyToken };
