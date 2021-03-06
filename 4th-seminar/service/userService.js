const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
  emailCheck: async (email) => {
    try {
      const alreadyEmail = await User.findOne({
        where: {
          email,
        }
      });
      console.log(alreadyEmail);
      return alreadyEmail;
    } catch (err) {
      throw err;
    }
  },
  signup: async (email, password, userName) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        email,
        password: hashedPassword,
        userName,
        salt,
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}