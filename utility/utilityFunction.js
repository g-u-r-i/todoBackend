const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hash a password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Compare a password with its hash
const comparePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    console.log("dssssssss",match)
    return match;
  } catch (error) {
    throw error;
  }
};



module.exports={hashPassword,comparePassword}