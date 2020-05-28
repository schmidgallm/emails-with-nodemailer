// Dependencies
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

const subscribe = async (eamilTo, user, res) => {
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

    // if unable to send email
    if (!response) {
      return res.status(535).json({ msg: 'Mailbox undeliverable' });
    }

    return res.status(200).json({
      message: 'Email sent succesfully',
      messageId: response.messageId
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = subscribe;
