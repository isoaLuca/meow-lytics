require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(user) {
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Meow-lytics 👻" <' + process.env.EMAIL_USER + ">",
    to: user.email,
    subject: "Confirmation de compte Meow-lytics ✔",
    text: `Attente de validation`,
    html: `<b>Bonjour ${user.firstName},</b><br><br>Votre compte est en attente de validation par un administrateur.<br><br>APP_ID: ${user.APP_ID}<br>APP_SECRET: ${user.APP_SECRET}<br><br>Une fois votre compte validé, vous pourrez utiliser ces informations pour intégrer le SDK Meow-lytics sur votre site.`,
  });

  console.log("Message envoyé: %s", info.messageId);
}

async function sendAdminApprovalEmail(user) {
  let transporter = nodemailer.createTransport({
    // ...
  });

  const approvalUrl = `https://yourwebsite.com/admin/approve/${user.id}`;

  let info = await transporter.sendMail({
    from: '"Meow-lytics 👻" <' + process.env.EMAIL_USER + ">",
    to: process.env.ADMIN_EMAIL,
    subject: "Nouvel utilisateur à approuver ✔",
    text: `Yeah !! Une nouvelle inscription! `,
    html: `Un nouvel utilisateur s'est inscrit et attend votre approbation. <a href="${approvalUrl}">Cliquez ici</a> pour approuver l'utilisateur.`,
  });

  console.log("Message envoyé: %s", info.messageId);
}

async function sendUserApprovalEmail(user) {
  let transporter = nodemailer.createTransport({
    // ...
  });

  let info = await transporter.sendMail({
    from: '"Meow-lytics 👻" <' + process.env.EMAIL_USER + ">",
    to: user.email,
    subject: "Votre compte a été approuvé ✔",
    text: `Bienvenue`,
    html: `Félicitations, votre compte a été approuvé par un administrateur! Voici votre APP_ID et APP_SECRET:<br><br>APP_ID: ${user.APP_ID}<br>APP_SECRET: ${user.APP_SECRET}`,
  });

  console.log("Message envoyé: %s", info.messageId);
}

module.exports = sendEmail;
