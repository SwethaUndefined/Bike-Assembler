const jwt = require('jsonwebtoken');
const User = require("../model/user");
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); 
};

const secretKey = generateSecretKey();

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });

      if (user) {
        if (password === user.password) {
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
          await User.findOneAndUpdate({ email }, { isLoggedin: true, token }); 
          return res.status(200).json({ success: true, token,username: user.username });
        } else {
          return res.status(401).json({
            success: false,
            error: "Incorrect password. Please enter the correct password.",
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          error: "Email not found. Please enter the correct email.",
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  logout: async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findOneAndUpdate(
        { username },
        { $set: { isLoggedin: false, token: '' } },
        { new: true }
      );
      if (user) {
        return res.status(200).json({ success: true, message: 'User logged out successfully.' });
      } else {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
};

