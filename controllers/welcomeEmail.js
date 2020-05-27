// Dependencies
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

const welcomeEmail = async (eamilTo, user) => {
  try {
    // create mail transporter
    // This is configed for gmail -- see docs for different providers
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    });

    // init mailing options
    const mailOptions = {
      from: process.env.user,
      to: eamilTo,
      subject: `Test`,
      text: `Hi there ${user}! Welcome to nodemailer!`
    };

    // init response
    const response = await transporter.sendMail(mailOptions);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

welcomeEmail('schmidgallm@outlook.com', 'Michaeal');

module.exports = welcomeEmail;
