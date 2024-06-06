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
          return res.status(200).json({ success: true, token });
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
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
};
