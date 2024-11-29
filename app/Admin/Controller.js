const models = require("../../models");
const { v4: uuidv4 } = require("uuid");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken")

const Login = async (req, res, next) => {
  if (!req.body.username) return res.status(500).json({ message: "invalid body" });
  if (!req.body.password) return res.status(500).json({ message: "invalid body" });

  let data = await models.Admin.findOne({
    where: { username: req.body.username },
  });

  if (!data) {
    return res.status(422).json({ status: 422, message: "user not found" });
  }

  // check password match with user password
  if (!passwordHash.verify(req.body.password, data.password)) {
    return res.status(404).json({ status: 404, message: "invalid password" });
  }
  delete data.password;
  // create token
  console.log(data);
  let token = jwt.sign(
    { id: data.id, source: "admin", role: data.role },
    process.env.JWT_SECRET,
    {}
  );
  res.json({
    message: "success",
    user: data,
    token,
  });
};

const Users = async (req, res, next) => {
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

const createAdmin = async (req, res, next) => {
  let password = passwordHash.generate("bank@1234");
  try {
    let user = await models.Admin.create({
      id: uuidv4(),
      username: "bank980",
      password: password,
      email: "ban@gmail.com",
      active:true
    });

    res.json({
      message: "success",
      user: user,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  Login,
  Users,
  createAdmin,
};
