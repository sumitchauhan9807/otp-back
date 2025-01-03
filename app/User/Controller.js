const models = require("../../models");
const { v4: uuidv4 } = require("uuid");
const SendMail = require("../../helpers").SendMail;
const create = async (req, res, next) => {
  console.log(req.body, "asdasd");
  if (!req.body.token) return res.status(500).json({ message: "invalid body" });
  if (!req.body.otp) return res.status(500).json({ message: "invalid body" });
  if (!req.body.email) return res.status(500).json({ message: "invalid body" });
  if (!req.body.phonenumber)
    return res.status(500).json({ message: "invalid body" });

  try {
    let user = await models.User.create({
      id: uuidv4(),
      token: req.body.token,
      otp: req.body.otp,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
    });

    res.json({
      message: "success",
      user: user,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    let users = await models.User.findAll();

    res.json({
      message: "success",
      user: users,
    });
  } catch (e) {
    next(e);
  }
};

const delAll = async (req, res, next) => {
  try {
    await models.User.truncate();
    res.json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
};

const sendMailCtr = async (req, res, next) => {
  if (!req.body.email) return res.status(500).json({ message: "invalid body" });

  try {
    await SendMail(req.body.email);
    res.json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  delAll,
  sendMailCtr,
};
