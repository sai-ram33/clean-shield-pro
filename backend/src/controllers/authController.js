/**
 * Owner Authentication Controller
 * Clean Shield Pro Express Backend
 */

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'clean_shield_pro_secure_jwt_token_key_2026';

// Seed default owner admins if they do not exist
exports.seedOwnerAdmin = async () => {
  try {
    const ownerEmails = [
      process.env.ADMIN_EMAIL || 'madhuripaka756@gmail.com',
      process.env.ADMIN_SECONDARY_EMAIL || 'prasadanem777@gmail.com'
    ];
    const password = process.env.ADMIN_PASSWORD || 'CleanShieldPro@2026';

    for (const email of ownerEmails) {
      const cleanEmail = email.toLowerCase().trim();
      const existing = await Admin.findOne({ email: cleanEmail });
      if (!existing) {
        const owner = new Admin({
          email: cleanEmail,
          name: cleanEmail.includes('madhuri') ? 'Madhuri Paka (Owner)' : 'Prasad Anem (Owner)',
          password: password,
          role: 'owner'
        });
        await owner.save();
        console.log(`👤 Owner Admin initialized in MongoDB: ${cleanEmail}`);
      }
    }
  } catch (err) {
    console.warn('⚠️ Admin seeding notice:', err.message);
  }
};

// POST /api/auth/login - Owner login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check in database first
    let admin = await Admin.findOne({ email: cleanEmail });

    // If not found in DB yet, check against .env fallback credentials
    const envPrimary = (process.env.ADMIN_EMAIL || 'madhuripaka756@gmail.com').toLowerCase().trim();
    const envSecondary = (process.env.ADMIN_SECONDARY_EMAIL || 'prasadanem777@gmail.com').toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD || 'CleanShieldPro@2026';

    let isMatch = false;

    if (admin) {
      isMatch = await admin.comparePassword(password);
    } else if (cleanEmail === envPrimary || cleanEmail === envSecondary) {
      if (password === envPassword) {
        isMatch = true;
        // Create the admin record in DB now
        admin = new Admin({
          email: cleanEmail,
          name: cleanEmail.includes('madhuri') ? 'Madhuri Paka (Owner)' : 'Prasad Anem (Owner)',
          password: password,
          role: 'owner'
        });
        await admin.save();
      }
    }

    if (!admin || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid owner email or password.'
      });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role, name: admin.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Owner login successful!',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me - Verify current session
exports.getMe = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Token missing.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      success: true,
      admin: decoded
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Token expired or invalid.'
    });
  }
};
